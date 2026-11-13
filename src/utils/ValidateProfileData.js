const validateProfileData = (userprofiledata) => {
    const allowedFields = ["firstname", "lastname", "age", "gender"];
    const isallowed = Object.keys(userprofiledata).every(field => allowedFields.includes(field));

    return isallowed

};

module.exports = validateProfileData;