import { Account } from "@contexts";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { firestore } from "..";
import addAccount from "./add";
import accountConverter from "./converter";

export async function loginAccount(username: string) {
    const docRef = query(collection(firestore, "accounts").withConverter(accountConverter), where('username', '==', username));
    const docSnap = await getDocs(docRef);
    let result: Account = { id: "", username: "", level: 0, xp: 0, challengers: 0 };
    docSnap.forEach(doc => {
        result = doc.data()
    })

    if (result.id !== "") {
        return result;
    }

    let id = await addAccount(username);
    return await getAccount(id);
}

export async function getAccount(id: string) {
    const docRef = doc(firestore, "accounts", id).withConverter(accountConverter);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return docSnap.data();
    }
    return null;
}
