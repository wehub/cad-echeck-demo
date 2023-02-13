import React from "react";
import WePay from './localJellyfish';
// import 'https://cdn.wepay.com/wepay.min.js';
import Button from '@mui/material/Button';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';


export default function CadECheck() {

  window.addEventListener("load", () => {
    if (typeof WePay !== 'object') {
      console.log("returning");
      return;
    }

    let currentEnvironment = ""

    if (window.location.hostname === 'dev.wepay') {
      currentEnvironment = "prod"
      console.log("prod")
    } else if (window.location.hostname !== 'dev.wepay') {
      currentEnvironment = "local"
      console.log("local")
    } else {
      console.log("nope")
    }

    const environmentMap = {
      "local": {
        endpoint: "https://stage-api.wepay.com",
        // TODO: this needs to be updated
        uploadEndpoint: "http://vm.wepay.com",
        iframeEndpoint: "https://localhost:3000",
      },
      "prod": {
        endpoint: "https://stage-api.wepay.com",
        uploadEndpoint: "https://stage-uploads.wepay.com",
        iframeEndpoint: "https://stage-iframe.wepay.com",
      }
    };

    WePay.STAGING_ENDPOINT = environmentMap[currentEnvironment].endpoint;
    WePay.STAGING_UPLOAD_ENDPOINT = environmentMap[currentEnvironment].uploadEndpoint;
    WePay.STAGE_IFRAME_ENDPOINT = environmentMap[currentEnvironment].iframeEndpoint;

    const appId = "814429";
    const apiVersion = "3.0";
    const error = WePay.configure("stage", appId, apiVersion);

    if (error) {
      console.log(error);
      return;
    }
  });

  const openPlaid = () => {
    if (error) {
      console.log(error);
    }

    var paymentBankLightBox = WePay.createPaymentBankLightBox(
      function (data) {
        console.log("plaid event:", data);
        if (paymentBankLightBox.error_code) {
          //error, light box could not be created.
          console.error(paymentBankLightBox);
        }
      },
      { avoid_micro_deposits: false }
    );

    paymentBankLightBox
      .tokenize()
      .then(function (response) {
        //payment method token created successfully.
        console.log("token_object:", response);
        //get the promise response from the console
        console.log('response', JSON.stringify(response));
        //print the token on the page; REMOVE IN PRODUCTION ENVIRONMENT
        var node = document.createElement('div');
        var token = ('response', JSON.stringify(response));
        node.innerHTML = response["id"];
        document.getElementById('tokenBank').appendChild(node);
      })

  }

  return (
    <>
      <Button variant="contained" id="tokenBank" onClick={() => openPlaid()} endIcon={<AccountBalanceWalletIcon />}>or Pay with bank</Button>
    </>
  );

}