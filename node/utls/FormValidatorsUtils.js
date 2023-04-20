let ServerError = require("../errors/server-error");
let ErrorType = require("../errors/error-type");

let numsAndLettersOnlyRegex = /^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/;
let lettersOnlyRegex = /^[A-Za-z _]*[A-Za-z][A-Za-z _]*$/;
let numsOnlyRegex = /^[0-9]*$/;
let emailRegex = /\S+@\S+\.\S+/;

function isRegexConditionValid(regex, value) {
    if (!new RegExp(regex).test(value)) {
        return false;
    }
    return true;
}

class FormValidatorsUtils {


    //=================Login Fields===================
    static validateLoginInputFields(user) {
        if (user.username.trim() == "" || user.password.toString().trim() == "") {
            let message = "All fields must be filled!";
            ErrorType.INVALID_INPUT_FIELD.message = message;
            throw new ServerError(ErrorType.INVALID_INPUT_FIELD);
        }

        if (!isRegexConditionValid(numsAndLettersOnlyRegex, user.password)) {
            comp.noteToUser = "Please use only letters and numbers";
            ErrorType.INVALID_INPUT_FIELD.message = message;
            throw new ServerError(ErrorType.INVALID_INPUT_FIELD);
        }

        if (user.password.length < 6) {
            let message = "Password is too short";
            ErrorType.INVALID_INPUT_FIELD.message = message;
            throw new ServerError(ErrorType.INVALID_INPUT_FIELD);
        }

        if (user.password.length > 44) {
            let message = "Password is too long";
            ErrorType.INVALID_INPUT_FIELD.message = message;
            throw new ServerError(ErrorType.INVALID_INPUT_FIELD);
        }

        if (user.username.length > 44) {
            let message = "Username is too long";
            ErrorType.INVALID_INPUT_FIELD.message = message;
            throw new ServerError(ErrorType.INVALID_INPUT_FIELD);
        }

        if (!isRegexConditionValid(emailRegex, user.username)) {
            let message = "Please enter a valid email address";
            ErrorType.INVALID_INPUT_FIELD.message = message;
            throw new ServerError(ErrorType.INVALID_INPUT_FIELD);
        }
    }


    //=================Check User Exist Fields===================
    static validateCheckIfUserExistFields(user) {
        console.log(user)

        if (user.username.trim() == "" || user.userId.toString().trim() == "") {
            let message = "Username and User ID must be filled";
            ErrorType.INVALID_INPUT_FIELD.message = message;
            throw new ServerError(ErrorType.INVALID_INPUT_FIELD);
        }

        if (!isRegexConditionValid(numsOnlyRegex, user.userId)) {
            let message = "Please use only numbers for user ID";
            ErrorType.INVALID_INPUT_FIELD.message = message;
            throw new ServerError(ErrorType.INVALID_INPUT_FIELD);
        }

        if (!isRegexConditionValid(emailRegex, user.username)) {
            let message = "Please enter a valid email address";
            ErrorType.INVALID_INPUT_FIELD.message = message;
            throw new ServerError(ErrorType.INVALID_INPUT_FIELD);
        }

        if (user.userId.toString().length > 9) {
            let message = "ID number is too long";
            ErrorType.INVALID_INPUT_FIELD.message = message;
            throw new ServerError(ErrorType.INVALID_INPUT_FIELD);
        }

        if (user.userId.toString().length < 8) {
            let message = "ID number is too short";
            ErrorType.INVALID_INPUT_FIELD.message = message;
            throw new ServerError(ErrorType.INVALID_INPUT_FIELD);
        }

        if (user.username.length > 44) {
            let message = "Username is too long";
            ErrorType.INVALID_INPUT_FIELD.message = message;
            throw new ServerError(ErrorType.INVALID_INPUT_FIELD);
        }

        if (user.username.length < 2) {
            let message = "Username is too short";
            ErrorType.INVALID_INPUT_FIELD.message = message;
            throw new ServerError(ErrorType.INVALID_INPUT_FIELD);
        }

    }


    //=================Register Fields===================

    static validateRegisterInputFields(user) {
        if (user.userId.toString().trim() == "" || user.firstName.trim() == "" ||
            user.lastName.trim() == "" || user.username.trim() == "" ||
            user.password.trim() == "" || user.street.trim() == "" || user.city.trim() == "") {
            let message = "All fields must be filled!";
            ErrorType.INVALID_INPUT_FIELD.message = message;
            throw new ServerError(ErrorType.INVALID_INPUT_FIELD);
        }

        if (!isRegexConditionValid(numsOnlyRegex, user.userId.toString())) {
            let message = "Please use only numbers for ID";
            ErrorType.INVALID_INPUT_FIELD.message = message;
            throw new ServerError(ErrorType.INVALID_INPUT_FIELD);
        }

        if (!isRegexConditionValid(lettersOnlyRegex, user.lastName) ) {
            let message = "Please use only letters for last name";
            ErrorType.INVALID_INPUT_FIELD.message = message;
            throw new ServerError(ErrorType.INVALID_INPUT_FIELD);
        }

        if (!isRegexConditionValid(lettersOnlyRegex, user.firstName) ) {
            let message = "Please use only letters for first name";
            ErrorType.INVALID_INPUT_FIELD.message = message;
            throw new ServerError(ErrorType.INVALID_INPUT_FIELD);
        }

        if (!isRegexConditionValid(lettersOnlyRegex, user.city) ) {
            let message = "Please use only letters for city";
            ErrorType.INVALID_INPUT_FIELD.message = message;
            throw new ServerError(ErrorType.INVALID_INPUT_FIELD);
        }

        if (!isRegexConditionValid(numsAndLettersOnlyRegex, user.street)) {
            let message = "Please use only letters and numbers for street field";
            ErrorType.INVALID_INPUT_FIELD.message = message;
            throw new ServerError(ErrorType.INVALID_INPUT_FIELD);
        }

        if (!isRegexConditionValid(numsAndLettersOnlyRegex, user.password)) {
            let message = "Please use only letters and numbers for password field";
            ErrorType.INVALID_INPUT_FIELD.message = message;
            throw new ServerError(ErrorType.INVALID_INPUT_FIELD);
        }

        if (user.firstName.length < 2) {
            let message = "First name is too short";
            ErrorType.INVALID_INPUT_FIELD.message = message;
            throw new ServerError(ErrorType.INVALID_INPUT_FIELD);
        }

        if (user.firstName.length > 44) {
            let message = "First name is too long";
            ErrorType.INVALID_INPUT_FIELD.message = message;
            throw new ServerError(ErrorType.INVALID_INPUT_FIELD);
        }

        if (user.lastName.length < 2) {
            let message = "Last name  is too short";
            ErrorType.INVALID_INPUT_FIELD.message = message;
            throw new ServerError(ErrorType.INVALID_INPUT_FIELD);
        }

        if (user.lastName.length > 44) {
            let message = "Last name is too long";
            ErrorType.INVALID_INPUT_FIELD.message = message;
            throw new ServerError(ErrorType.INVALID_INPUT_FIELD);
        }

        if (user.password.length < 6) {
            let message = "Password is too short";
            ErrorType.INVALID_INPUT_FIELD.message = message;
            throw new ServerError(ErrorType.INVALID_INPUT_FIELD);
        }

        if (user.password.length > 16) {
            let message = "Password is too long";
            ErrorType.INVALID_INPUT_FIELD.message = message;
            throw new ServerError(ErrorType.INVALID_INPUT_FIELD);
        }

        if (user.username.length < 2) {
            let message = "Username is too short";
            ErrorType.INVALID_INPUT_FIELD.message = message;
            throw new ServerError(ErrorType.INVALID_INPUT_FIELD);
        }

        if (user.username.length > 44) {
            let message = "Username is too long";
            ErrorType.INVALID_INPUT_FIELD.message = message;
            throw new ServerError(ErrorType.INVALID_INPUT_FIELD);
        }

        if (user.street.length < 2) {
            let message = "Street is too short";
            ErrorType.INVALID_INPUT_FIELD.message = message;
            throw new ServerError(ErrorType.INVALID_INPUT_FIELD);
        }

        if (user.street.length > 44) {
            let message = "Street is too long";
            ErrorType.INVALID_INPUT_FIELD.message = message;
            throw new ServerError(ErrorType.INVALID_INPUT_FIELD);
        }

        if (user.city.length < 2) {
            let message = "City is too short";
            ErrorType.INVALID_INPUT_FIELD.message = message;
            throw new ServerError(ErrorType.INVALID_INPUT_FIELD);
        }

        if (user.city.length > 44) {
            let message = "City is too long";
            ErrorType.INVALID_INPUT_FIELD.message = message;
            throw new ServerError(ErrorType.INVALID_INPUT_FIELD);
        }

        if (!isRegexConditionValid(emailRegex, user.username)) {
            let message = "Please enter a valid email address";
            ErrorType.INVALID_INPUT_FIELD.message = message;
            throw new ServerError(ErrorType.INVALID_INPUT_FIELD);
        }

        if (user.userId.toString().length > 9) {
            let message = "ID number is too long";
            ErrorType.INVALID_INPUT_FIELD.message = message;
            throw new ServerError(ErrorType.INVALID_INPUT_FIELD);
        }

        if (user.userId.toString().length < 8) {
            let message = "ID number is too short";
            ErrorType.INVALID_INPUT_FIELD.message = message;
            throw new ServerError(ErrorType.INVALID_INPUT_FIELD);
        }
    }

    static validateAmountField(product) {
        if (!product.amount || product.amount.toString().trim() == "") {
            let message = "Product was not added to cart, Please verify a quantity";

            ErrorType.INVALID_INPUT_FIELD.message = message;
            throw new ServerError(ErrorType.INVALID_INPUT_FIELD);
        }

        if (product.amount <= 0) {
            let message = "Product was not added to cart, Please verify a valid quantity";

            ErrorType.INVALID_INPUT_FIELD.message = message;
            throw new ServerError(ErrorType.INVALID_INPUT_FIELD);
        }

        //to block html tags in input field (and any special character)
        if (!isRegexConditionValid(numsOnlyRegex, product.amount.toString())) {
            let message = "Product was not added to cart, please use only numbers";

            ErrorType.INVALID_INPUT_FIELD.message = message;
            throw new ServerError(ErrorType.INVALID_INPUT_FIELD);
        }
    }

    static validateCheckoutFormFields(orderDetails, busyDeliveryDates) {
        if (!orderDetails.city ||
            !orderDetails.street ||
            !orderDetails.shippingDate ||
            !orderDetails.creditCard ||
            orderDetails.city.trim() == "" ||
            orderDetails.street.trim() == "" ||
            orderDetails.creditCard.toString().trim() == "") {
            let message = "All fields must be filled";

            ErrorType.INVALID_INPUT_FIELD.message = message;
            throw new ServerError(ErrorType.INVALID_INPUT_FIELD);
        }

        console.log(new Date(orderDetails.shippingDate));

        //to block html tags in input field (and any special character)
        if (!isRegexConditionValid(numsAndLettersOnlyRegex, orderDetails.street)) {
            let message = "Please use only letters and numbers for street";

            ErrorType.INVALID_INPUT_FIELD.message = message;
            throw new ServerError(ErrorType.INVALID_INPUT_FIELD);
        }

        if (!isRegexConditionValid(numsOnlyRegex, orderDetails.creditCard.toString())) {
            let message = "Please use only numbers for credit card";

            ErrorType.INVALID_INPUT_FIELD.message = message;
            throw new ServerError(ErrorType.INVALID_INPUT_FIELD);
        }


        if (!isRegexConditionValid(lettersOnlyRegex, orderDetails.city)) {
            let message = "Please use only letters for city";

            ErrorType.INVALID_INPUT_FIELD.message = message;
            throw new ServerError(ErrorType.INVALID_INPUT_FIELD);
        }

        if (busyDeliveryDates.includes(new Date(orderDetails.shippingDate))) {
            let message = "The delivery date you picked is busy, please pick another";
            ErrorType.INVALID_INPUT_FIELD.message = message;
            throw new ServerError(ErrorType.INVALID_INPUT_FIELD);
        }

        if (new Date(orderDetails.shippingDate) < new Date()) {
            let message = "The delivery date you picked has passed, please pick another";
            ErrorType.INVALID_INPUT_FIELD.message = message;
            throw new ServerError(ErrorType.INVALID_INPUT_FIELD);
        }

        if (orderDetails.street.length < 2) {
            let message = "Street is too short";
            ErrorType.INVALID_INPUT_FIELD.message = message;
            throw new ServerError(ErrorType.INVALID_INPUT_FIELD);
        }

        if (orderDetails.street.length > 44) {
            let message = "Street is too long";
            ErrorType.INVALID_INPUT_FIELD.message = message;
            throw new ServerError(ErrorType.INVALID_INPUT_FIELD);
        }

        if (orderDetails.creditCard.toString().length < 12) {
            let message = "Credit card number is too short";
            ErrorType.INVALID_INPUT_FIELD.message = message;
            throw new ServerError(ErrorType.INVALID_INPUT_FIELD);
        }

        if (orderDetails.creditCard.toString().length > 12) {
            let message = "Credit card number is too long";
            ErrorType.INVALID_INPUT_FIELD.message = message;
            throw new ServerError(ErrorType.INVALID_INPUT_FIELD);
        }
    }

    static validateUpdateProductFields(product) {
        if (!product.name ||
            !product.categoryId ||
            !product.price ||
            !product.imageURL ||
            product.name.trim() == "" ||
            product.price.toString().trim() == "" ||
            product.imageURL.trim() == "") {

            let message = "Product was not updated, All fields must be filled";

            ErrorType.INVALID_INPUT_FIELD.message = message;
            throw new ServerError(ErrorType.INVALID_INPUT_FIELD);
        }

        if (!isRegexConditionValid(numsAndLettersOnlyRegex, product.name)) {
            let message = "Product was not updated, please use only letters and numbers for product name";
            ErrorType.INVALID_INPUT_FIELD.message = message;
            throw new ServerError(ErrorType.INVALID_INPUT_FIELD);
        }

        if (!isRegexConditionValid(numsOnlyRegex, product.price.toString())) {
            let message = "Product was not updated, please use only numbers";
            ErrorType.INVALID_INPUT_FIELD.message = message;
            throw new ServerError(ErrorType.INVALID_INPUT_FIELD);
        }

        if (product.price <= 0) {
            let message = "Product was not updated, please fill a valid price";

            ErrorType.INVALID_INPUT_FIELD.message = message;
            throw new ServerError(ErrorType.INVALID_INPUT_FIELD);
        }

        if (product.name.length > 44) {
            let message = "Product was not updated, product name is too long";

            ErrorType.INVALID_INPUT_FIELD.message = message;
            throw new ServerError(ErrorType.INVALID_INPUT_FIELD);
        }

        if (product.imageURL.length > 119) {
            let message = "Product was not updated, Image URL is too long";

            ErrorType.INVALID_INPUT_FIELD.message = message;
            throw new ServerError(ErrorType.INVALID_INPUT_FIELD);
        }
    }

    static validateAddProductFields(product) {
        if (!product.name ||
            !product.categoryId ||
            !product.price ||
            !product.imageURL ||
            product.name.trim() == "" ||
            product.price.toString().trim() == "") {
            let message = "Product was not added, All fields must be filled";

            ErrorType.INVALID_INPUT_FIELD.message = message;
            throw new ServerError(ErrorType.INVALID_INPUT_FIELD);
        }

        if (!isRegexConditionValid(numsAndLettersOnlyRegex, product.name)) {
            let message = "Product was not updated, please use only letters and numbers";
            ErrorType.INVALID_INPUT_FIELD.message = message;
            throw new ServerError(ErrorType.INVALID_INPUT_FIELD);
        }

        if (!isRegexConditionValid(numsOnlyRegex, product.price.toString())) {
            let message = "Product was not updated, please use only numbers";
            ErrorType.INVALID_INPUT_FIELD.message = message;
            throw new ServerError(ErrorType.INVALID_INPUT_FIELD);
        }

        if (product.price <= 0) {
            let message = "Product was not added, please fill a valid price";

            ErrorType.INVALID_INPUT_FIELD.message = message;
            throw new ServerError(ErrorType.INVALID_INPUT_FIELD);
        }

        if (product.name.length > 44) {
            let message = "Product was not added, product name is too long";

            ErrorType.INVALID_INPUT_FIELD.message = message;
            throw new ServerError(ErrorType.INVALID_INPUT_FIELD);
        }


        if (product.imageURL.length > 119) {
            let message = "Product was not updated, Image URL is too long";

            ErrorType.INVALID_INPUT_FIELD.message = message;
            throw new ServerError(ErrorType.INVALID_INPUT_FIELD);
        }
    }


}

module.exports = FormValidatorsUtils;