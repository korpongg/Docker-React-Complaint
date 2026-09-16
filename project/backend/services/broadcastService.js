const { clients } = require("./websocketManager");

const {
  getCenter1,
  getCenter2,
  getCenter3,
  getCenter4,
} = require("../controllers/broadcastController");


async function executeAndStoreQueryResult() {

  try {

    console.log("CLIENT COUNT", Object.keys(clients).length);


    for (const client of Object.values(clients)) {


      const requests = [
        {
          type:"DATA1",
          fn:getCenter1
        },
        {
          type:"DATA2",
          fn:getCenter2
        },
        {
          type:"DATA3",
          fn:getCenter3
        },
        {
          type:"DATA4",
          fn:getCenter4
        }
      ];


      for(const item of requests){

        const data = await item.fn(
          client.currentFilters?.[item.type] || {}
        );


        client.send(JSON.stringify({
          type:"CENTER_DATA",
          requestType:item.type,
          data:data
        }));

      }


    }


  } catch(err){
    console.error(err);
  }

}


module.exports={
 executeAndStoreQueryResult
};