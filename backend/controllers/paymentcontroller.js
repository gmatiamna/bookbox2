const axios = require("axios");
module.exports = {
  Add: async (req, res) => {
    const url = "https://developers.flouci.com/api/generate_payment";

    const { amount } = req.body;
    if (!amount) return res.status(400).json({ message: "Amount is required" });

    const payload = {
      app_token: "7846468e-c023-45ba-b735-85dd337ed435",
      app_secret: process.env.FLOUCI_SECRET,
      amount: amount, 
      accept_card: "true",
      session_timeout_secs: 1200,
      success_link: "http://localhost:3000/success",
      fail_link: "http://localhost:3000/fail",
      developer_tracking_id: "84f47a5f-d416-422c-9749-6d7d88b6ca08"
    };

    try {
      const result = await axios.post(url, payload);
      res.send(result.data);
    } catch (err) {
      console.error(err);
     console.error("Error response:", error.response?.data);
    }
  },

  Verify: async (req, res) => {
    const id_payment = req.params.id;
    const url = `https://developers.flouci.com/api/verify_payment/${id_payment}`;

    try {
      const result = await axios.get(url, {
        headers: {
          'Content-Type': 'application/json',
          'apppublic': "7846468e-c023-45ba-b735-85dd337ed435",
          'appsecret': process.env.FLOUCI_SECRET
        }
      });
      res.send(result.data);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ message: "Payment verification failed" });
    }
  }
};
