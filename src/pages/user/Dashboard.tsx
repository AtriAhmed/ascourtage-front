import React, { useEffect, useState } from 'react';
import {
  IonContent,
  IonPage,
  IonCard,
  IonCardContent,
  IonIcon,
} from '@ionic/react';
import {
  documentText,
  documentTextOutline,
  people,
  person,
} from 'ionicons/icons';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

import CustomSidebar from '../../components/layouts/user/UserSidebar';
import Loading from '../../components/Loading';
import Header from '../../components/layouts/Header';
import axios from 'axios';
import { useHistory } from 'react-router';

const ROUTES = [
  { path: '/bordereaux',   label: 'Bordereaux', icon: documentText },
  { path: '/adherents',    label: 'Adherents',  icon: people },
  { path: '/profile',      label: 'Profile',    icon: person },
  { path: '/decomptes',    label: 'Decomptes',  icon: documentTextOutline },
];

type MonthlyTotal = { month: string; total: number };

interface StatsResponse {
  bordereauxNb: number;
  adherentsNb: number;
  decomptesTotal: number;
  monthlyTotals: MonthlyTotal[];
}

const Dashboard: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const history = useHistory();

  const [stats, setStats] = useState<{
    bordereauxNb: number;
    adherentsNb: number;
    decomptesTotal: number;
  } | null>(null);

  const [monthlyTotals, setMonthlyTotals] = useState<MonthlyTotal[]>([]);

  useEffect(() => {
    axios.get<StatsResponse>('/api/stats/user').then((res) => {
      const { bordereauxNb, adherentsNb, decomptesTotal, monthlyTotals } = res.data;
      setStats({ bordereauxNb, adherentsNb, decomptesTotal });
      setMonthlyTotals(monthlyTotals);
    });
  }, []);

  if (!stats) {
    return <Loading type="page" />;
  }

  // Prepare data for Chart.js
  const chartData = {
    labels: monthlyTotals.map((m) => m.month),
    datasets: [
      {
        label: 'Total Mensuel',
        data: monthlyTotals.map((m) => m.total),
        fill: false,
        borderColor: 'rgba(75,192,192,1)',
        tension: 0.1,
      },
    ],
  };

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
        ticks: { precision: 0 },
      },
    },
  };

  return (
    <IonPage>
      <Header
        title="Dashboard"
        isExpanded={isExpanded}
        setIsExpanded={setIsExpanded}
      />
      <IonContent>
        <CustomSidebar
          isExpanded={isExpanded}
          setIsExpanded={setIsExpanded}
        />

        <div className="pl-[60px] pb-[48px]">
          {/* Top stats cards */}
          <div className="grid grid-cols-12 gap-4">
            {ROUTES.map((route, idx) => {
              const value =
                idx === 0
                  ? stats.bordereauxNb
                  : idx === 1
                  ? stats.adherentsNb
                  : stats.decomptesTotal;

              return (
                <div key={route.path} className="col-span-6">
                  <IonCard onClick={() => history.push(route.path)}>
                    <IonCardContent className="flex flex-col items-center justify-center border-l-8 border-primary">
                      <IonIcon icon={route.icon} className="text-xl mb-2" />
                      <div className="text-2xl font-bold">{value}</div>
                      <div>{route.label}</div>
                    </IonCardContent>
                  </IonCard>
                </div>
              );
            })}
          </div>

          {/* Monthly totals chart */}
          <div className="mt-8">
            <IonCard>
              <IonCardContent>
                <h2 className="mb-4 text-lg font-semibold">Totaux Remboursement Mensuels</h2>
                <Line data={chartData} options={chartOptions} />
              </IonCardContent>
            </IonCard>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Dashboard;
