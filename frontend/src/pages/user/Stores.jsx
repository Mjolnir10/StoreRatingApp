import { useEffect, useState } from "react";
import api from "../../services/api";
import Header from "../admin/components/Header";
import Sidebar from "../admin/components/Sidebar";
import RecentStoresTable from "../admin/components/RecentStoresTable";

const userLinks = [
  { to: "/admin/dashboard", label: "Admin Dashboard" },
  { to: "/owner/dashboard", label: "Owner Dashboard" },
  { to: "/stores", label: "Stores" },
];

export default function Stores() {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/stores")
      .then((res) => {
        setStores(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ display: "flex" }}>
      <Sidebar links={userLinks} />
      <div style={{ marginLeft: 220, padding: "1rem", flex: 1 }}>
        <Header title="Stores" />
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
              gap: "1rem",
            }}
          >
            {stores.map((store) => (
              <RecentStoresTable key={store.id} store={store} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
