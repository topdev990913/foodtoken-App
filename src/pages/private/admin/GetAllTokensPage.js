import React, { useEffect, useState } from "react";
import PageTitle from "../../../components/private/navigation/PageTitle";
import ToastFunc from "../../../helpers/toasts/ToastFunc";

import useActionDispatcher from "../../../hooks/useActionDispatcher";
import useStateValues from "../../../hooks/useStateValues";

import GetAllTokensApiCall from "../../../apis/admin/GetAllTokensApiCall";
import GetAllTokens from "../../../components/private/admin/GetAllTokens";
const GetAllTokensPage = () => {
  const [tokenState, setTokenState] = useState("");

  const dispatch = useActionDispatcher();
  const { jwtToken } = useStateValues();

  useEffect(() => {
    (async () => {
      dispatch({ type: "loadingOn" });
      const response = await GetAllTokensApiCall(jwtToken);
      dispatch({ type: "loadingOff" });

      if (response.data.type === "success") {
        //api call success
        setTokenState(response.data.tokensFound);
        ToastFunc({ msg: response.data.msg, type: "success" });
      } else {
        //apicall failed
        ToastFunc({ msg: response.data.msg, type: "error" });
      }
    })();
  }, [dispatch, jwtToken]);
  return (
    <>
      {/* this is pageTitle */}
      <>
        <PageTitle title="GetAll Tokens" />
      </>

      <GetAllTokens tokenState={tokenState} />
    </>
  );
};

export default GetAllTokensPage;
