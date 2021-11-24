import mock from '@/@fake-db/mock'

const data = {
  actionsLog: {
    series: [
      {
        name: 'Actions',
        data: [28, 40, 36, 52, 38, 60, 55],
      },
    ],
    analyticsData: {
      subscribers: 92600,
    },
  },
  inspectionsLog: {
    series: [
      {
        name: 'Inspections',
        data: [350, 275, 400, 300, 350, 300, 450],
      },
    ],
    analyticsData: {
      revenue: 97500,
    },
  },
  hazardsLog: {
    series: [
      {
        name: 'Hazards',
        data: [10, 15, 7, 12, 3, 16],
      },
    ],
    analyticsData: {
      sales: '3600',
    },
  },
  incidentsLog: {
    data: [
    ],
    series: [
      {
        name: 'Incidents',
        data: [10, 15, 8, 15, 7, 12, 8],
      },
    ],
    analyticsData: {
      orders: 97500,
    },
  },
  siteTraffic: {
    series: [
      {
        name: 'Traffic Rate',
        data: [150, 200, 125, 225, 200, 250],
      },
    ],
  },
  activeUsers: {
    series: [
      {
        name: 'Active Users',
        data: [750, 1000, 900, 1250, 1000, 1200, 1100],
      },
    ],
  },
  incidents: {
    series: [
      {
        name: 'Newsletter',
        data: [365, 390, 365, 400, 375, 400],
      },
    ],
  },
}

mock.onGet('/card/card-statistics/actions').reply(() => [200, data.actionsLog])

mock.onGet('/card/card-statistics/inspections').reply(() => [200, data.inspectionsLog])

mock.onGet('/card/card-statistics/hazards').reply(() => [200, data.hazardsLog])

mock.onGet('/card/card-statistics/incidents').reply(() => [200, data.incidentsLog])

mock.onGet('/card/card-statistics/site-traffic').reply(() => [200, data.siteTraffic])

mock.onGet('/card/card-statistics/active-users').reply(() => [200, data.activeUsers])

mock.onGet('/card/card-statistics/newsletter').reply(() => [200, data.newsletter])
mock.onPost('/card/card-statistics/newsletter').passThrough(()=>{
  data.newsletter
})
