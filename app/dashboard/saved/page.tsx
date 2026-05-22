import { getLikedStores } from "@/lib/query/getLikeStore";
import StoreCard from "../storeCard";

export default async function SavedStoresPage() {
  const likedStores = await getLikedStores();

  if (!likedStores.length) {
    return (
      <p className="text-center text-muted-foreground">No saved stores yet</p>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {likedStores.map(({ store }) => (
        <StoreCard key={store.id} store={store} />
      ))}
    </div>
  );
}
