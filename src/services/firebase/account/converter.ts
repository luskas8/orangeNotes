import { Account } from "@contexts";
import { QueryDocumentSnapshot, SnapshotOptions } from "firebase/firestore";

const accountConverter = {
    toFirestore: (account: Account) => {
        return {
            id: account.id,
            username: account.username,
            level: account.level,
            xp: account.xp,
            challengers: account.challengers,
        }
    },
    fromFirestore: (snapshot: QueryDocumentSnapshot, options: SnapshotOptions): Account => {
        const data = snapshot.data(options);
        return {
            id: snapshot.id,
            username: data.username,
            level: data.level,
            xp: data.xp,
            challengers: data.challengers,
        }
    }
}

export default accountConverter;
