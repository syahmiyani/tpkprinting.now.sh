function catchErrors(error, setErrorMsg) {
  let errorMsg;
  if (error.response) {
    errorMsg = error.response.data;
    console.log("Error response", errorMsg);

    if (error.response.data.error) {
      errorMsg = error.response.data.error.message;
    }
  } else if (error.request) {
    // response return no readible error or non readable response
    errorMsg = error.request;
    console.log("Error on request", errorMsg);
  } else if (error.message) {
    errorMsg = error.message;
    console.log("Some unknown Error on response", errorMsg);
  } else {
    errorMsg = error;
    console.log("Typical Error");
  }
  setErrorMsg(errorMsg);
}

export default catchErrors;
