import React from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import StatCard from "./components/StatCard";
import ChartWidget from "./components/ChartWidget";
import DataTable from "./components/DataTable";
import FilterBar from "./components/FilterBar";

import styles from "./styles/adminDashboard.module.css";

const dummyStats = [
  { title: "Total Stores", value: 124, icon: "store" },
  { title: "Active Users", value: 2834, icon: "people" },
  { title: "Monthly Revenue", value: "$45.2k", icon: "revenue" },
];

export default function AdminDashboard() {
  return (
    <div className={styles.root}>
      <Header />
      <Sidebar />
      <main className={styles.mainContent}>
        {/* Stat cards */}
        <section className={styles.statsRow}>
          {dummyStats.map((s) => (
            <StatCard key={s.title} title={s.title} value={s.value} icon={s.icon} />
          ))}
        </section>

        {/* Charts */}
        <section className={styles.chartsRow}>
          <ChartWidget
            title="Sales Over Time"
            dataKey="sales"
            data={[
              { month: "Jan", sales: 1200 },
              { month: "Feb", sales: 1500 },
              { month: "Mar", sales: 1700 },
              { month: "Apr", sales: 1900 },
            ]}
          />
          <ChartWidget
            title="User Growth"
            dataKey="users"
            data={[
              { month: "Jan", users: 800 },
              { month: "Feb", users: 950 },
              { month: "Mar", users: 1300 },
              { month: "Apr", users: 1600 },
            ]}
          />
        </section>

        {/* Table with filter bar */}
        <section className={styles.tableSection}>
          <FilterBar />
          <DataTable />
        </section>
      </main>
    </div>
  );
}
