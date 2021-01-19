// export const validateForm = (formData, newErrors) => {
//   // let formField = data.formField;
//   let errors = newErrors;
//   let data = formData;
//   let formIsValid = true;
//   //   if (!data.firstName) {
//   //     formIsValid = false;
//   //     errors["firstName"] = "*Cannot be empty";
//   //   }
//   //   if (typeof data.firstName !== "undefined") {
//   //     if (!data.firstName.match(/^[a-zA-Z ]*$/)) {
//   //       formIsValid = false;
//   //       errors["firstName"] = "*Please enter alphabet characters only.";
//   //     }
//   //   }
//   //   if (!data.lastName) {
//   //     formIsValid = false;
//   //     errors["lastName"] = "Cannot be empty";
//   //   }
//   if (!data.email) {
//     formIsValid = false;
//     errors["email"] = "Cannot be empty";
//   }
//   if (!data.password) {
//     formIsValid = false;
//     errors["password"] = "Cannot be empty";
//   }
//   //   if (typeof data.lastName !== "undefined") {
//   //     if (!data.lastName.match(/^[a-zA-Z ]*$/)) {
//   //       formIsValid = false;
//   //       errors["lastName"] = "*Please enter alphabet characters only.";
//   //     }
//   //   }
//   //   if (!data.phone) {
//   //     formIsValid = false;
//   //     errors["Phone"] = "*Please enter your mobile no.";
//   //   }

//   //   if (typeof data.phone !== "undefined") {
//   //     if (!data.phone.match(/^[0-9]{11}$/)) {
//   //       formIsValid = false;
//   //       errors["Phone"] = "*Please enter valid mobile no.";
//   //     }
//   //   }
//   //   if (!data.address) {
//   //     formIsValid = false;
//   //     errors["address"] = "*Cannot be empty";
//   //   }
//   //   if (!data.street) {
//   //     formIsValid = false;
//   //     errors["street"] = "Cannot be empty";
//   //   }
//   //   if (!data.city) {
//   //     formIsValid = false;
//   //     errors["city"] = "*Cannot be empty";
//   //   }
//   //   if (!data.state) {
//   //     formIsValid = false;
//   //     errors["state"] = "*Cannot be empty";
//   //   }
//   // this.setState({ errors: errors });
//   return formIsValid;
// };

// export const validateForm = (user, errors) => {
//   //   let errors = error;
//   let formIsValid = true;

//   if (!user.email) {
//     formIsValid = false;
//     return (errors["email"] = "Cannot be empty");
//   }
//   if (!user.password) {
//     formIsValid = false;
//     return (errors["password"] = "Cannot be empty");
//   }
//   //   setError(errors);
//   return formIsValid;
// };
