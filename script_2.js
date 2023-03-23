document.addEventListener("DOMContentLoaded", function (event) {
  // Get the form elements
  const form = document.getElementById("sign-form");
  const messageInput = document.getElementById("message");
  const nonceInput = document.getElementById("nonce");

  // Add a submit event listener to the form
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const nonce = nonceInput.value;

    console.log(window.keplr);
    const key = await window.keplr.getKey("Oraichain");
    const userAddress = key.bech32Address;
    console.log(userAddress);
    const signature = await window.keplr.signArbitrary(
      "Oraichain",
      key.bech32Address,
      JSON.stringify({
        nonce: nonce,
      })
    );
    // Display signature
    console.log(signature.pub_key);
    console.log(signature.signature);
    var requestData = {
      publicKeyType: signature.pub_key.type,
      publicKeyValue: signature.pub_key.value,
      signature: signature.signature,
      nonce: nonce,
      address: userAddress,
    };
    renderJSON(requestData); // call the function to render the JSON data
    // signatureInput.value = signature.signature;
  });

  // function renderJSON(data) {
  //   $("#json-container").JSONView(data); // render the JSON data in the container
  //   hljs.highlightBlock($("#json-container")[0]); // apply syntax highlighting to the JSON data
  //   var copyButton = $("<button class='copy-button'>Copy</button>"); // create a copy button
  //   $("#json-container").before(copyButton); // add the copy button before the JSON container
  //   new ClipboardJS(copyButton[0], {
  //     text: function() { return JSON.stringify(data, null, 2); } // set the text to be copied to the JSON data
  //   }); // initialize Clipboard.js to handle copying
  // }

  function renderJSON(data) {
    // var url = "path/to/your/json/data.json"; // replace with the URL of your JSON data
    // $.getJSON(url, function(data) {
    $("#json-container").JSONView(data); // render the JSON data in the container

    var copyButton = $("<button class='copy-button'>Copy</button>"); // create a copy button
    $("#json-container").before(copyButton); // add the copy button before the JSON container
    new ClipboardJS(copyButton[0], {
      text: function () {
        return JSON.stringify(data, null, 2);
      }, // set the text to be copied to the JSON data
    }); // initialize Clipboard.js to handle copying
  }
  renderJSON(); // call the function to render the JSON data
});
