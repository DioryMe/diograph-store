import { DiographStore } from "./diograph-store"

DiographStore.setAuthToken("test-token")

DiographStore.get("5691").then(diory => {
  console.log(diory);
}).catch(err => {
  console.log(err);
});
