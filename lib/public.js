import { addDoc, collection, doc, getDoc, getDocs, orderBy, query, serverTimestamp, where } from "firebase/firestore";
import { db } from "./firebase";

const list = async (q) => (await getDocs(q)).docs.map((d) => ({ id: d.id, ...d.data() }));

export const getSettings = async () => (await getDoc(doc(db, "settings", "site"))).data() || {};
export const getGallery = (category) => list(category && category !== "All"
  ? query(collection(db, "gallery"), where("category", "==", category))
  : query(collection(db, "gallery"), orderBy("createdAt", "desc")));
export const getServices = () => list(query(collection(db, "services"), orderBy("createdAt", "desc")));
export const getReviews = () => list(query(collection(db, "reviews"), where("approved", "==", true)));
// visitor review form -> stays hidden until you approve it in /admin/reviews
export const submitReview = ({ name, rating, comment }) =>
  addDoc(collection(db, "reviews"), { name, rating: Number(rating), comment, source: "Website", approved: false, createdAt: serverTimestamp() });
