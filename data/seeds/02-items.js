exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("items")
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex("items").insert([
        {
          name: "tacos",
          img_url: "hehahhahaah",
          price: 1.22,
          desc_english: "the best tacos in town",
          desc_spanish: "los mejores tacos",
          category: "tacos",
          admin_id: 1,
        },
        {
          name: "ham torta",
          img_url: "hehahhahaah",
          price: 6.22,
          desc_english: "the best tortas in town",
          desc_spanish: "los mejores tortas",
          category: "tortas",
          admin_id: 1,
        },
        {
          name: "roll tacos",
          img_url: "hehahhahaah",
          price: 3.22,
          desc_english: "the best tacos in town",
          desc_spanish: "los mejores tacos rollos",
          category: "tacos",
          admin_id: 1,
        },
        {
          name: "enchiladas",
          img_url: "hehahhahaah",
          price: 9.22,
          desc_english: "the best enchiladas in town",
          desc_spanish: "los mejores enchiladas",
          category: "enchiladas",
          admin_id: 1,
        },
      ]);
    });
};
