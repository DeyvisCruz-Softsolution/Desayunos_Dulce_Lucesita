import React, { useEffect, useState } from 'react';
import { getDashboardData } from '../services/dashboardService';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const Card = ({ children }) => (
  <div style={{ background: '#fff', borderRadius: '12px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', marginBottom: '20px' }}>
    {children}
  </div>
);

const CardContent = ({ children }) => <div>{children}</div>;

const DashboardPage = () => {
  const [stats, setStats] = useState(null);
  const [period, setPeriod] = useState('month');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getDashboardData({ period });
        setStats(data);
      } catch (error) {
        console.error('Error al obtener estadísticas', error);
      }
    };
    fetchStats();
  }, [period]);

  if (!stats) return <div>Cargando estadísticas...</div>;

  return (
    <div className="p-4 grid gap-4">
      {/* Selector de periodo */}
      <div>
        <label htmlFor="periodo">Periodo:</label>
        <select id="periodo" value={period} onChange={(e) => setPeriod(e.target.value)}>
          <option value="day">Por Día</option>
          <option value="week">Por Semana</option>
          <option value="month">Por Mes</option>
          <option value="6months">Últimos 6 Meses</option>
        </select>
      </div>

      {/* Ingresos Totales */}
      <Card>
        <CardContent>
          <h2 className="text-xl font-bold">Ingresos Totales</h2>
          <p className="text-2xl text-green-600 font-semibold">
            ${stats.totalIncome?.toFixed(2) ?? 0}
          </p>
        </CardContent>
      </Card>

      {/* Pedidos por Estado */}
      <Card>
        <CardContent>
          <h2 className="text-xl font-bold">Pedidos por Estado</h2>
          {stats.statusCounts.map((s) => (
            <p key={s.status}>
              <strong>{s.status}</strong>: {s.count}
            </p>
          ))}
        </CardContent>
      </Card>

      {/* Ventas por Período */}
      <Card className="col-span-2">
        <CardContent>
          <h2 className="text-xl font-bold mb-2">Ventas por {period}</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={[...stats.salesByPeriod].reverse()}>
              <XAxis dataKey="period" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="totalSales" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Top Productos */}
      <Card className="col-span-2">
        <CardContent>
          <h2 className="text-xl font-bold mb-2">Top Productos Vendidos</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={stats.topProducts}>
              <XAxis dataKey="Product.title" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="totalSold" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Top Clientes */}
      <Card className="col-span-2">
        <CardContent>
          <h2 className="text-xl font-bold mb-2">Top Clientes</h2>
          <ul>
            {stats.topClients.map((client) => (
              <li key={client.userId}>
                <strong>{client.User.name}</strong> ({client.User.email}) — {client.ordersCount} pedidos
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardPage;
