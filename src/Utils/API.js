import axios from "axios";

export default {
  getArchive : function() {
    return axios.get("/api/archive");
  },
  
  getEntry : function(id) {
    return axios.get("/api/archive/" + id);
  },
  
  deleteEntry: function(id) {
    return axios.delete("/api/archive/" + id);
  },
  
  saveEntry: function(entryData) {
    return axios.post("/api/archive", entryData);
  },
  searchAPI: phrase => axios.get("https://doaj.org/api/v1/search/articles/"+ phrase +"?page=1&pageSize=50")
    
};