import "./edit.css";
import axios from "axios";
import { React, useState, useEffect } from "react";
import swal from "sweetalert";
function EditUser() {
  const [edit, setEdit] = useState(false);
  const [user, setUser] = useState({});
  const [Info, editInfo] = useState({
    name: "",
    password: "",
    repeatPassword: "",
    email: "",
    bio: "",
  });

  const sowPhoto=user.photo

  const [submit, setSubmit] = useState(false);
  const [photo, setPhoto] = useState("");
  const getUser = () => {
    const token = localStorage.getItem("token");
    const headers = { headers: { Authorization: `Bearer ${token}` } };
    axios
      .get("http://localhost:4000/api/user/", headers)
      .then(({ data }) => {
        // console.log("USERBEFORE", this.user);
        console.log("here", data);
        setUser(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getUser();
  }, [submit]);
  const uploadImage = (event) => {
    event.preventDefault();

    const image = new FormData();

    image.append("file", event.target.files[0]);
    image.append("upload_preset", "tyfhc3lt");
    axios
      .post("https://api.cloudinary.com/v1_1/dkcwqbl9d/image/upload", image)
      .then(({ data }) => {
        setPhoto(data.url);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleEditUser = () => {
    const data = {
      name: Info.name,
      bio: Info.bio,
      phone: Info.phone,
      email: Info.email,
      password: Info.password,
      photo: photo,
    };
    console.log("userId", user._id);
    const has_special = /[!@#%*+=._-]/.test(Info.password);
    const has_number = /\d/.test(Info.password);
    if (
      Info.name === "" ||
      Info.password === "" ||
      Info.repeatPassword === "" ||
      Info.email === ""
    ) {
      swal("Oops!", "Empty fields", "error");
    } else if (!has_special && has_number) {
      swal(
        "Oops!",
        "Password needs to have at least one special character and one number",
        "error"
      );}
      else if (Info.email!==user.email) {
        swal(
          "Oops!",
          "Add you current email",
          "error"
        );
    } else if (Info.password !== Info.repeatPassword) {
      swal("Oops!", "Password does not match!", "error");
    } else {
      axios
        .patch(`http://localhost:4000/api/user/${user._id}`, data)
        .then(({ data }) => {
          swal("Welcome", "success");
          console.log("the user changed",data)

          setSubmit(!submit);
          console.log("submit",submit)
        });
    }
  };
  const handleChangeEdit = (e) => {
    const { name, value } = e.target;
    editInfo((Info) => ({ ...Info, [name]: value }));
  };
  const show = () => {
    setEdit(!edit);
  };

  return (
    <div className="contain">
      {edit === false && (
        <div className="container">
          <div className="personal_info">
            <h2>Personal info</h2>
            <p>basic info,like your name and photo</p>
          </div>

          <table>
            <tr className="profile_tr">
              <td className="profile">profile</td>
              <td>
                <button className="profile_btn" onClick={show}>
                  edit
                </button>
              </td>
            </tr>
            <tr className="photo_div">
              <td className="photo_profile">photo</td>
              <td className="button_edit">
               { sowPhoto===""
                    ? (<img
                     className="photo_profile"
                     src="https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"
                   />) : (<img
                    className="photo_profile"
                    src={user.photo}
                  />) 

               }   
              </td>
            </tr>
            <tr className="col_tr">
              <td className="text_title">NAME</td>
              <td className="text">{user.name}</td>
            </tr>
            <tr className="col_tr">
              <td className="text_title">BIO</td>
              <td className="text"> {user.bio} </td>
            </tr>
            <tr className="col_tr">
              <td className="text_title">phone</td>
              <td className="text">{user.phone}</td>
            </tr>
            <tr className="col_tr">
              <td className="text_title">email</td>
              <td className="text">{user.email}</td>
            </tr>
          </table>
        </div>
      )}
      {edit === true && (
        <div className="contain_edit">
          <button className="back_btn" onClick={show}>
            <i className="arrow left"></i>Back
          </button>
          <div className="div_inputs">
            <div className="text_div">
              <h5>Change Info</h5>
              <p className="para_small">
                changes will reflected in every services
              </p>
            </div>
            <div className="profile-div">
              <img
                className="img-div"
                id="blah"
                src="https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg "
              />
                     { sowPhoto===""
                    ? (<img
                        id="blah"
                        src="https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"
                   />) : (<img
                    id="blah"
                    src={user.photo}
                  />) 

               }  
              <div className="overlay">
                <input
                  id="imgInp"
                  type="file"
                  onChange={(event) => uploadImage(event)}
                />
                <p className="para-pic">Change Picture</p>
              </div>
            </div>
            <form>
              <div className="edit">
                <p htmlFor="name" className="paragraph_input">
                  name
                </p>
                <input
                  onChange={handleChangeEdit}
                  value={Info.name}
                  name="name"
                  type="text"
                  className="input"
                  data-type="name"
                  placeholder="enter your name"
                />
              </div>
              <div className="edit">
                <p htmlFor="Bio" className="paragraph_input">
                  Bio
                </p>
                <input
                  onChange={handleChangeEdit}
                  value={Info.bio}
                  rows="10"
                  name="bio"
                  type="text"
                  className="input"
                  data-type="Bio"
                  placeholder="enter your Bio"
                />
              </div>
              <div className="edit">
                <p htmlFor="Phone" className="paragraph_input">
                  Phone
                </p>
                <input
                  onChange={handleChangeEdit}
                  value={Info.phone}
                  name="phone"
                  type="text"
                  className="input"
                  data-type="Phone"
                  placeholder="enter your Phone"
                />
              </div>
              <div className="edit">
                <p htmlFor="Email" className="paragraph_input">
                  Email
                </p>
                <input
                  onChange={handleChangeEdit}
                  value={Info.email}
                  name="email"
                  type="email"
                  className="input"
                  data-type="Email"
                  placeholder="enter your Email"
                />
              </div>
              <div className="edit">
                <p htmlFor="Password" className="paragraph_input">
                  Password
                </p>
                <input
                  onChange={handleChangeEdit}
                  value={Info.password}
                  name="password"
                  type="password"
                  className="input"
                  data-type="Password"
                  placeholder="enter your Password"
                />
              </div>
              <div className="edit">
                <p htmlFor="repeat password" className="paragraph_input">
                  repeat password
                </p>
                <input
                  onChange={handleChangeEdit}
                  value={Info.repeatPassword}
                  name="repeatPassword"
                  type="password"
                  className="input"
                  data-type="repeat password"
                  placeholder="Repeat password"
                />
              </div>
            </form>
            <button className="submit" onClick={handleEditUser}>
              save
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
export default EditUser;
