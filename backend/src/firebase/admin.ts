import  admin  from "firebase-admin";
import * as ServiceAccout from "../../serviceAccountKey.json"

admin.initializeApp({
    credential: admin.credential.cert(ServiceAccout as admin.ServiceAccount)
});

export default admin;