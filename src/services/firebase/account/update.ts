import { Account } from "@contexts";
import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { firestore } from "..";
import accountConverter from "./converter";

export default async function updateAccount(account: Account) {
    const accountRef = doc(firestore, 'accounts', account.id).withConverter(accountConverter);

    const updatedTimestamp = await updateDoc(accountRef, { ...account, timestamp: serverTimestamp() });
}
