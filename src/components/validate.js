

const validate = (values) => {
let errors={}


if (values.password !== values.cpassword) {
    errors.cpassword="password is not matiching"
    errors.err=true
}
    return errors
}

export default validate
