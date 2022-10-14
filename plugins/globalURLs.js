export default (
  { $config: { baseURL, apiName, currentApiVersion } },
  inject
) => {
  inject('urls', {
    ACCOUNT_REGISTER: `${baseURL}${apiName}/${currentApiVersion}/register/`,
    RE_SEND_EMAIL: `${baseURL}${apiName}/${currentApiVersion}/register/resend/`,
    VALIDATE_REGISTER: `${baseURL}${apiName}/${currentApiVersion}/register/validate/`,
    SUBMIT_USER: `${baseURL}${apiName}/${currentApiVersion}/accounts/`,
    UPLOAD_USER_IMAGE: `${baseURL}${apiName}/${currentApiVersion}/account/upload/`, // Append filename after this url
    GET_CURRENT_USER: `${baseURL}${apiName}/${currentApiVersion}/accounts/me/`,
    ACCESS_TOKEN: `${baseURL}${apiName}/token/`,
    REFRESH_TOKEN: `${baseURL}${apiName}/token/refresh/`,
    PAYMENT_LINK: `${baseURL}${apiName}/${currentApiVersion}/links/`,
    MOVEMENTS: `${baseURL}${apiName}/${currentApiVersion}/activity/`,
  })
}
