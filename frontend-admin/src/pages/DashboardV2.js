import React, { useEffect, useState } from 'react';
import { getDashboardV2 } from '../services/dashboardV2Service';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const DashboardV2 = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    getDashboardV2().then(setData);
  }, []);

  if (!data) return <p style={{ padding: 20 }}>Cargando dashboard...</p>;

  const kpis = data?.kpis || {};
  const topProducts = data?.topProducts || [];
  const topClients = data?.topClients || [];
  const salesLast7Days = data?.salesLast7Days || [];
  const insights = data?.insights || [];

  return (
    <div style={{
      padding: '25px',
      background: '#f4f6f9',
      minHeight: '100vh',
      fontFamily: 'system-ui, sans-serif'
    }}>

      {/* HEADER */}
      <div style={{ marginBottom: '25px' }}>
        <h1 style={{ margin: 0, fontSize: '28px' }}>📊 Dashboard Empresarial</h1>
        <p style={{ color: '#666', marginTop: '5px' }}>
          Analítica en tiempo real de tu negocio
        </p>
      </div>

      {/* KPIs PRO */}
      <div style={{
        display: 'grid',
        gap: '15px',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))'
      }}>
        {[
          { title: 'Ingresos', value: `$${(kpis.totalIncome || 0).toFixed(0)}` },
          { title: 'Pedidos Hoy', value: kpis.todayOrders || 0 },
          { title: 'Pendientes', value: kpis.pendingOrders || 0 },
          { title: 'Ticket Promedio', value: `$${(kpis.avgTicket || 0).toFixed(0)}` },
          { title: 'Clientes', value: kpis.customers || 0 }
        ].map((kpi, i) => (
          <div key={i} style={{
            background: '#fff',
            padding: '18px',
            borderRadius: '14px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
            transition: '0.2s',
            cursor: 'pointer'
          }}
          onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <p style={{ margin: 0, color: '#888', fontSize: '14px' }}>
              {kpi.title}
            </p>
            <h2 style={{ margin: '5px 0 0', fontSize: '22px' }}>
              {kpi.value}
            </h2>
          </div>
        ))}
      </div>

      {/* ALERTA */}
      {(kpis.pendingOrders || 0) > 0 && (
        <div style={{
          marginTop: '20px',
          background: '#fff3cd',
          padding: '15px',
          borderRadius: '12px',
          border: '1px solid #ffeeba'
        }}>
          ⚠️ Tienes {kpis.pendingOrders} pedidos pendientes
        </div>
      )}

      {/* INSIGHTS */}
      <div style={{
        marginTop: '20px',
        background: '#fff',
        padding: '20px',
        borderRadius: '14px',
        boxShadow: '0 4px 10px rgba(0,0,0,0.05)'
      }}>
        <h2>🧠 Insights</h2>

        {insights.length > 0
          ? insights.map((i, idx) => (
            <p key={idx} style={{ margin: '5px 0', color: '#555' }}>
              {i}
            </p>
          ))
          : <p>No hay insights</p>}
      </div>

      {/* GRID PRINCIPAL */}
      <div style={{
        display: 'grid',
        gap: '20px',
        marginTop: '25px',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))'
      }}>

        {/* GRÁFICA */}
        <div style={{
          background: '#fff',
          padding: '20px',
          borderRadius: '14px',
          boxShadow: '0 4px 10px rgba(0,0,0,0.05)'
        }}>
          <h2>📈 Ventas últimos 7 días</h2>

          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={salesLast7Days}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="total" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* CLIENTES */}
        <div style={{
          background: '#fff',
          padding: '20px',
          borderRadius: '14px',
          boxShadow: '0 4px 10px rgba(0,0,0,0.05)'
        }}>
          <h2>👤 Mejores Clientes</h2>

          {topClients.length > 0 ? topClients.map((c, i) => (
            <div key={i} style={{
              marginTop: '12px',
              paddingBottom: '8px',
              borderBottom: '1px solid #eee'
            }}>
              <strong>{c.name}</strong>
              <p style={{ margin: 0, fontSize: '13px', color: '#666' }}>
                {c.totalOrders} pedidos • ${c.totalSpent.toFixed(0)}
              </p>
            </div>
          )) : <p>No hay clientes</p>}
        </div>

      </div>

      {/* PRODUCTOS */}
      <div style={{
        marginTop: '25px',
        background: '#fff',
        padding: '20px',
        borderRadius: '14px',
        boxShadow: '0 4px 10px rgba(0,0,0,0.05)'
      }}>
        <h2>🔥 Productos más vendidos</h2>

        {topProducts.length > 0 ? topProducts.map((p, i) => (
          <div key={i} style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '10px',
            borderBottom: '1px solid #eee',
            paddingBottom: '6px'
          }}>
            <span>{p.title}</span>
            <strong>{p.totalSold}</strong>
          </div>
        )) : <p>No hay productos</p>}
      </div>

    </div>
  );
};

export default DashboardV2;