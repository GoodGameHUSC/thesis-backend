import rules, { normalValidate } from './rules';
const { email, cellphone, country_code } = rules

const OTP_Create_User = {
  email,
  cellphone,
  country_code
}
const OTP_Send_SMS = {
  twillioId: normalValidate('twillioId')
}
const OTP_Verify_Code = {
  twillioId: normalValidate('twillioId'),
  code: normalValidate('code'),
  phone_number : normalValidate('phone_number')
}
const validatorSchema = {
  OTP_Create_User,
  OTP_Send_SMS,
  OTP_Verify_Code
}
export default validatorSchema;