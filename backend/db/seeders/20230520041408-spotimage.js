"use strict";
let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = "SpotImages";
    return queryInterface.bulkInsert(
      options,
      [
        {
          spotId: 1,
          url: "https://media.istockphoto.com/id/1150545984/photo/upscale-modern-mansion-with-pool.jpg?s=612x612&w=0&k=20&c=JT7qSGgmlGfiNiqJE2jw6rYwRcYCj9KBs7i2Rmyyypo=",
          preview: true,
        },
        {
          spotId: 1,
          url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRahOaLjT3amAmeohrFKV_I49XCPMQDejBMZQ&usqp=CAU",
          preview: true,
        },
        {
          spotId: 1,
          url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSapL7UChiHO9LLFdGme0xVHRix6A1bB2_k-A&usqp=CAU",
          preview: true,
        },
        {
          spotId: 1,
          url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8nQRFFOvs_Bk_jnnHCAA_9Rne27sFIz6Zsw&usqp=CAU",
          preview: true,
        },
        {
          spotId: 1,
          url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEFitemsVyZDoDinwuhHjuIK0tvbhgSLxa3g&usqp=CAU",
          preview: true
        },
        {
          spotId: 2,
          url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMSu9qoQDP-_c1oPtvrqgl5F4iv-BQifGadQ&usqp=CAU",
          preview: true,
        },
        {
          spotId: 2,
          url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7_Ubm3J06VT4yQ-srQkY4sPF8oHW9JWaFgg&usqp=CAU",
          preview: true,
        },
        {
          spotId: 2,
          url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSc3PGAxHoSzUrOmOrwAdghr-_Ho_pjvEO8AQ&usqp=CAU",
          preview: true,
        },
        {
          spotId: 2,
          url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThTXHn0PvRYC7hKOeHeylrLIaTfKn3mixniQ&usqp=CAU",
          preview: true,
        },
        {
          spotId: 2,
          url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTD3CzmT3nIwtqUtDiq9m4k2zoc3Pn6ANuCkg&usqp=CAU",
          preview: true,
        },

        {
          spotId: 3,
          url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLbTGWnADS-iYHrvrCjM5BmmJ4RIDr_mx0Xg&usqp=CAU",
          preview: true,
        },
        {
          spotId: 3,
          url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQE8yTo_HEsrjiOewNFL8L5Bf8lnM8P0IHJ-A&usqp=CAU",
          preview: true,
        },
        {
          spotId: 3,
          url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSA23MKWjjIDSLI87FPQy9CQxIu5PgQ1KL-mg&usqp=CAU",
          preview: true,
        },
        {
          spotId: 3,
          url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTO1c6jRC6EtjhBgq0iA3XXeUY0pJ4VqcnyJg&usqp=CAU",
          preview: true,
        },
        {
          spotId: 3,
          url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMP8_r6u6jVe4hLjBOHKsnQIH-5Cq_6InIEw&usqp=CAU",
          preview: true,
        },
        {
          spotId: 4,
          url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGW6D9i_bFgbk-DuXSWVeobFXBNCdGYB95Yg&usqp=CAU",
          preview: true,
        },
        {
          spotId: 4,
          url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSy8CWczyu3t8mI9eqWXy3pGX4zuJ-D-W3Tmg&usqp=CAU",
          preview: true,
        },
        {
          spotId: 4,
          url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlVIgqRWAmgpTSoe4ukxvzQRy-GQs7Ko64_g&usqp=CAU",
          preview: true,
        },
        {
          spotId: 4,
          url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoOMSQM_zis9RXnZV_u_x5F3rkH691Ez9b1zmu52b0tszjkrxGbFWYHyvwRPziu80vxU4&usqp=CAU",
          preview: true,
        },
        {
          spotId: 4,
          url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQO1vEF3zP5Is1w_4NJg2Vy2vSJ67ImPDXbmlS3rM0TMXyj2fkMm8E8OGtFL16Og6yPT6s&usqp=CAU",
          preview: true,
        },
        {
          spotId: 5,
          url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStuoT8RuiP_mOcAgn-N9c-eSoXtcX9H3J1V3f-Hao4k4TV95SpxS_9Ot2pYjFQjt1Vz5M&usqp=CAU",
          preview: true,
        },
        {
          spotId: 5,
          url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfDxSBGt_iVwGdp70gSjOsiuyMZIsjZNanux_rudUTTuHT6_YEhvHPcPaZ9iPHLWxmFNI&usqp=CAU",
          preview: true,
        },
        {
          spotId: 5,
          url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROGqRPbCU7ViaSsRxYShAvLuP6Wy-Ep6vfyg&usqp=CAU",
          preview: true,
        },
        {
          spotId: 5,
          url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLqrrD0YlEtAJgoL27Lfci-Qa8ZP4Xt8QGTg&usqp=CAU",
          preview: true,
        },
        {
          spotId: 5,
          url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDZAl_tNFLMuprWRe5hKF0qQeTEs79GG-79Q&usqp=CAU",
          preview: true,
        },

        {
          spotId: 6,
          url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRe3Z2cVyxbfIboioT97rsJgqOFMm15QBQRL-WqT98hOVw93Qgc0VidH27xIyQcUlDxU54&usqp=CAU",
          preview: true,
        },
        {
          spotId: 6,
          url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQovu9JBVWmpRaW3Px-HcbWgtOK6LnnRnWuSw&usqp=CAU",
          preview: true,
        },
        {
          spotId: 6,
          url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcDk8Wd8nsOvL9rBIKcSlqmGlZeGoV4-z4Og&usqp=CAU",
          preview: true,
        },
        {
          spotId: 6,
          url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBin1O28fzhNz26ZyyBNXdIL2UCkLrY83EGw&usqp=CAU",
          preview: true,
        },
        {
          spotId: 6,
          url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3xZAdhynePmQEX4mspuSr5dvt_jGXyKGsLQ&usqp=CAU",
          preview: true,
        },
        {
          spotId: 7,
          url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuJJi1NzQqXRHm-jey5VUVQWk4pUXnrKVFkw&usqp=CAU",
          preview: true,
        },
        {
          spotId: 7,
          url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtMrgvuszBnPI-AQcPUH12gus1WiRwgpdNBQ&usqp=CAU",
          preview: true,
        },
        {
          spotId: 7,
          url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRk-VZ6iIL30g-27BALtpt6jpBJyK-3mrCfT-dmsXsFz4lZkooTvcEx4E9TJ_Niy3CGl8&usqp=CAU",
          preview: true,
        },
        {
          spotId: 7,
          url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTU_Q9922LVxxMU27m3B8Rkten4jrgg_hbXzA&usqp=CAU",
          preview: true,
        },
        {
          spotId: 7,
          url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfxFagteyCRKgMu_SupnpQfOWM1b43bP8VLQ&usqp=CAU",
          preview: true,
        },

        {
          spotId: 8,
          url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0fI7z0qQQZdSQyBnysoLguSB_nf9yGTXlQA&usqp=CAU",
          preview: true,
        },
        {
          spotId: 8,
          url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPnQI9ake1XUZBlRv_rIH_J5F_tLbQtjy2YQ&usqp=CAU",
          preview: true,
        },
        {
          spotId: 8,
          url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7HQDdFoEs6SLXInR5U3sYNa8KGiL3jSfRzQ&usqp=CAU",
          preview: true,
        },
        {
          spotId: 8,
          url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6NOjbCximV4RGPZ5h8BSPjiJrWjXpC4J7QA&usqp=CAU",
          preview: true,
        },
        {
          spotId: 8,
          url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfzncDtquVJteJ4O6jPAE2Cs9ACFdJadJFiQ&usqp=CAU",
          preview: true,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "SpotImages";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        spotId: { [Op.in]: [1, 2, 3, 4, 5, 6, 7, 8] },
      },
      {}
    );
  },
};
