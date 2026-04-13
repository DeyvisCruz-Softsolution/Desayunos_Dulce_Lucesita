import React, { useEffect, useState } from 'react';
import { getDashboardV2 } from '../services/dashboardV2Service';
import KpiCard from '../components/dashboard/KpiCard';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const DashboardV2 = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getDashboardV2();
        setData(res);
      } catch (error) {
        console.error('Error dashboard:', error);
      }
    };

    fetchData();
  }, []);

  if (!data) return <p>Cargando dashboard...</p>;

  // 🔥 PROTECCIÓN
  const kpis = data?.kpis || {};
  const topProducts = data?.topProducts || [];
  const topClients = data?.topClients || [];
  const salesLast7Days = data?.salesLast7Days || [];
  const insights = data?.insights || [];

  return (
    <div style={{ padding: '25px', background: '#f4f6f9', minHeight: '100vh' }}>

      <h1>🚀 Dashboard Empresarial</h1>

      {/* KPIs */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '20px',
        marginTop: '20px'
      }}>
        <KpiCard title="Ingresos" value={`$${(kpis.totalIncome || 0).toFixed(0)}`} color="#4CAF50" />
        <KpiCard title="Pedidos Hoy" value={kpis.todayOrders || 0} color="#2196F3" />
        <KpiCard title="Pendientes" value={kpis.pendingOrders || 0} color="#FF9800" />
        <KpiCard title="Ticket Promedio" value={`$${(kpis.avgTicket || 0).toFixed(0)}`} color="#9C27B0" />
        <KpiCard title="Clientes" value={kpis.customers || 0} color="#E91E63" />

        <KpiCard
          title="Crecimiento"
          value={`${(kpis.growth || 0).toFixed(1)}%`}
          color={kpis.growth >= 0 ? "#4CAF50" : "#f44336"}
        />
      </div>

      {/* ALERTA */}
      {(kpis.pendingOrders || 0) > 0 && (
        <div style={{
          background: '#fff3cd',
          padding: '15px',
          borderRadius: '10px',
          marginTop: '20px'
        }}>
          ⚠️ Tienes {kpis.pendingOrders} pedidos pendientes
        </div>
      )}

      {/* INSIGHTS */}
      <div style={{
        marginTop: '20px',
        background: '#fff',
        padding: '20px',
        borderRadius: '18px'
      }}>
        <h2>🧠 Insights</h2>

        {insights.length > 0
          ? insights.map((i, idx) => <p key={idx}>{i}</p>)
          : <p>No hay insights</p>
        }
      </div>

      {/* GRID */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '2fr 1fr',
        gap: '20px',
        marginTop: '30px'
      }}>

        {/* GRÁFICO */}
        <div style={{ background: '#fff', padding: '20px', borderRadius: '18px' }}>
          <h2>📈 Ventas últimos 7 días</h2>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={salesLast7Days}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="total" fill="#4CAF50" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* TOP 3 */}
        <div style={{ background: '#fff', padding: '20px', borderRadius: '18px' }}>
          <h2>🥇 Top Productos</h2>

          {topProducts.slice(0, 3).map((p, i) => (
            <div key={i} style={{
              marginTop: '15px',
              padding: '10px',
              background: i === 0 ? '#fff8e1' : '#f5f5f5',
              borderRadius: '10px'
            }}>
              <strong>{i + 1}. {p.title}</strong>
              <p>{p.totalSold} vendidos</p>
            </div>
          ))}
        </div>

      </div>

      {/* PRODUCTOS */}
      <div style={{
        marginTop: '30px',
        background: '#fff',
        padding: '20px',
        borderRadius: '18px'
      }}>
        <h2>🔥 Productos Top</h2>

        {topProducts.map((p, i) => (
          <div key={i} style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '10px'
          }}>
            <span>{p.title}</span>
            <span>{p.totalSold} vendidos</span>
          </div>
        ))}
      </div>

      {/* CLIENTES */}
      <div style={{
        marginTop: '30px',
        background: '#fff',
        padding: '20px',
        borderRadius: '18px'
      }}>
        <h2>👤 Mejores Clientes</h2>

        {topClients.length > 0 ? (
          topClients.map((c, i) => (
            <div key={i} style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: '10px'
            }}>
              <span>{c.name}</span>
              <span>${c.totalSpent.toFixed(0)}</span>
            </div>
          ))
        ) : (
          <p>No hay clientes</p>
        )}
      </div>

    </div>
  );
};

export default DashboardV2;