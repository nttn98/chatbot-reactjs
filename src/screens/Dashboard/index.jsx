// index.jsx
import React, { useState, useEffect } from "react";
import { Bar, Pie, Line, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import "./styles.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend
);

function Dashboard() {
  const [timeRange, setTimeRange] = useState("6months");
  const [refreshCount, setRefreshCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const generateRandomData = (baseValues, variance = 0.3) => {
    return baseValues.map((value) => {
      const change = (Math.random() - 0.5) * variance * value;
      return Math.max(0, Math.round(value + change));
    });
  };

  const generateDateLabels = (range) => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    if (range === "6months") return months.slice(0, 6);
    if (range === "12months") return months;
    return ["Week 1", "Week 2", "Week 3", "Week 4"];
  };

  const getBaseData = (range) => {
    if (range === "6months") return [150, 200, 180, 220, 300, 350];
    if (range === "12months")
      return [150, 200, 180, 220, 300, 350, 280, 320, 290, 340, 380, 420];
    return [45, 60, 55, 70];
  };

  const [chartData, setChartData] = useState({
    import: generateRandomData(getBaseData(timeRange)),
    export: generateRandomData([100, 150, 125, 175, 200, 220]),
    categories: generateRandomData([40, 25, 20, 15]),
  });

  const refreshData = () => {
    setIsLoading(true);
    setTimeout(() => {
      setChartData({
        import: generateRandomData(getBaseData(timeRange)),
        export: generateRandomData(
          timeRange === "6months"
            ? [100, 150, 125, 175, 200, 220]
            : timeRange === "12months"
            ? [100, 150, 125, 175, 200, 220, 180, 210, 190, 230, 250, 280]
            : [30, 40, 35, 45]
        ),
        categories: generateRandomData([40, 25, 20, 15]),
      });
      setRefreshCount((prev) => prev + 1);
      setIsLoading(false);
    }, 500);
  };

  useEffect(() => {
    const interval = setInterval(refreshData, 10000);
    return () => clearInterval(interval);
  }, [timeRange]);

  useEffect(() => {
    refreshData();
  }, [timeRange]);

  const barData = {
    labels: generateDateLabels(timeRange),
    datasets: [
      {
        label: "Tổng Doanh Thu Nhập Khẩu ($K)",
        data: chartData.import,
        backgroundColor: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        borderRadius: 8,
        barPercentage: 0.7,
        borderWidth: 0,
      },
    ],
  };

  const pieData = {
    labels: ["Điện tử", "Thực phẩm", "Máy móc", "Dệt may"],
    datasets: [
      {
        data: chartData.categories,
        backgroundColor: ["#667eea", "#f093fb", "#4facfe", "#43e97b"],
        borderWidth: 0,
        hoverBorderWidth: 3,
        hoverBorderColor: "#fff",
      },
    ],
  };

  const lineData = {
    labels: generateDateLabels(timeRange),
    datasets: [
      {
        label: "Xu hướng Xuất Khẩu ($K)",
        data: chartData.export,
        fill: true,
        backgroundColor: "rgba(102, 126, 234, 0.1)",
        borderColor: "#667eea",
        pointBackgroundColor: "#667eea",
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
        pointRadius: 6,
        tension: 0.4,
        borderWidth: 3,
      },
    ],
  };

  const doughnutData = {
    labels: ["Hoàn thành", "Đang xử lý", "Chờ duyệt"],
    datasets: [
      {
        data: [65, 25, 10],
        backgroundColor: ["#28a745", "#ffc107", "#dc3545"],
        borderWidth: 0,
        cutout: "70%",
      },
    ],
  };

  const chartOptions = {
    plugins: {
      legend: {
        labels: {
          color: "#495057",
          font: { size: 12, weight: "600" },
          padding: 20,
        },
      },
      tooltip: {
        backgroundColor: "rgba(0,0,0,0.8)",
        titleColor: "#fff",
        bodyColor: "#fff",
        padding: 12,
        cornerRadius: 8,
        displayColors: true,
      },
    },
    scales: {
      x: {
        ticks: { color: "#6c757d", font: { size: 11, weight: "500" } },
        grid: { display: false },
      },
      y: {
        ticks: { color: "#6c757d", font: { size: 11, weight: "500" } },
        grid: { color: "rgba(0,0,0,0.05)" },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  const pieOptions = {
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#495057",
          font: { size: 11, weight: "600" },
          padding: 15,
        },
      },
      tooltip: {
        backgroundColor: "rgba(0,0,0,0.8)",
        titleColor: "#fff",
        bodyColor: "#fff",
        padding: 12,
        cornerRadius: 8,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  const totalImport = chartData.import.reduce((a, b) => a + b, 0);
  const totalExport = chartData.export.reduce((a, b) => a + b, 0);
  const growthRate = (
    ((totalExport - totalImport) / totalImport) *
    100
  ).toFixed(1);

  return (
    <div className="colorful-dashboard">
      <div className="container-fluid">
        <div className="container-fluid">
          {/* Header */}
          <div className="colorful-header">
            <div className="d-flex justify-content-between align-items-center flex-wrap">
              <div>
                <h2 className="mb-1">
                  <span className="rainbow-icon floating-icon">📊</span>
                  Thống Kê Hàng Hóa
                </h2>
                <p className="text-white mb-0 opacity-75">
                  Thông tin trực quan về nhập/xuất khẩu - Cập nhật lần cuối:{" "}
                  {new Date().toLocaleString("vi-VN")}
                </p>
              </div>
              <div className="d-flex gap-4 mt-4 mt-md-0">
                <select
                  className="colorful-select"
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                >
                  <option value="4weeks">4 Tuần</option>
                  <option value="6months">6 Tháng</option>
                  <option value="12months">12 Tháng</option>
                </select>
                <button
                  className="glow-btn"
                  onClick={refreshData}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span className="loading-spinner me-2"></span>Đang tải
                    </>
                  ) : (
                    <>🔄 Làm mới</>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="row mb-4">
            <div className="col-md-3 mb-3">
              <div className="card colorful-card colorful-card-1 h-100 border-0">
                <div className="card-body text-center position-relative">
                  <div
                    className="floating-icon mb-3"
                    style={{ fontSize: "2.5rem" }}
                  >
                    📥
                  </div>
                  <h5 className="card-title text-muted mb-2">Tổng Nhập Khẩu</h5>
                  <h3
                    className="pulse-number mb-2"
                    style={{ color: "#667eea", fontWeight: "bold" }}
                  >
                    ${totalImport}K
                  </h3>
                  <small className="text-success">📈 +12.5%</small>
                </div>
              </div>
            </div>

            <div className="col-md-3 mb-3">
              <div className="card colorful-card colorful-card-2 h-100 border-0">
                <div className="card-body text-center position-relative">
                  <div
                    className="floating-icon mb-3"
                    style={{ fontSize: "2.5rem" }}
                  >
                    📤
                  </div>
                  <h5 className="card-title text-muted mb-2">Tổng Xuất Khẩu</h5>
                  <h3
                    className="pulse-number mb-2"
                    style={{ color: "#f093fb", fontWeight: "bold" }}
                  >
                    ${totalExport}K
                  </h3>
                  <small className="text-success">📈 +8.3%</small>
                </div>
              </div>
            </div>

            <div className="col-md-3 mb-3">
              <div className="card colorful-card colorful-card-3 h-100 border-0 sparkle position-relative">
                <div className="card-body text-center">
                  <div
                    className="floating-icon mb-3"
                    style={{ fontSize: "2.5rem" }}
                  >
                    📊
                  </div>
                  <h5 className="card-title text-muted mb-2">Tăng trưởng</h5>
                  <h3
                    className={`pulse-number mb-2 ${
                      growthRate >= 0 ? "text-success" : "text-danger"
                    }`}
                    style={{ fontWeight: "bold" }}
                  >
                    {growthRate >= 0 ? "+" : ""}
                    {growthRate}%
                  </h3>
                  <small
                    className={growthRate >= 0 ? "text-success" : "text-danger"}
                  >
                    {growthRate >= 0 ? "📈" : "📉"} So với kỳ trước
                  </small>
                </div>
              </div>
            </div>

            <div className="col-md-3 mb-3">
              <div className="card colorful-card colorful-card-4 h-100 border-0">
                <div className="card-body text-center">
                  <div
                    className="floating-icon mb-3"
                    style={{ fontSize: "2.5rem" }}
                  >
                    📦
                  </div>
                  <h5 className="card-title text-muted mb-2">Đơn hàng</h5>
                  <h3
                    className="pulse-number mb-2"
                    style={{ color: "#43e97b", fontWeight: "bold" }}
                  >
                    {Math.floor(Math.random() * 500) + 200}
                  </h3>
                  <small className="text-muted">
                    ⏳ Đang xử lý: {Math.floor(Math.random() * 50) + 10}
                  </small>
                </div>
              </div>
            </div>
          </div>

          {/* Charts */}
          <div className="row mb-4">
            <div className="col-lg-8 mb-4">
              <div className="card chart-card border-0">
                <div className="card-header bg-transparent border-0 pb-0">
                  <h5 className="card-title mb-0">📊 Doanh Thu Nhập Khẩu</h5>
                </div>
                <div className="card-body">
                  <div style={{ height: "300px" }}>
                    <Bar data={barData} options={chartOptions} />
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-4 mb-4">
              <div className="card chart-card border-0">
                <div className="card-header bg-transparent border-0 pb-0">
                  <h5 className="card-title mb-0">🍩 Trạng thái Đơn hàng</h5>
                </div>
                <div className="card-body">
                  <div style={{ height: "300px" }}>
                    <Doughnut data={doughnutData} options={pieOptions} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-lg-8 mb-4">
              <div className="card chart-card border-0">
                <div className="card-header bg-transparent border-0 pb-0">
                  <h5 className="card-title mb-0">📈 Xu Hướng Xuất Khẩu</h5>
                </div>
                <div className="card-body">
                  <div style={{ height: "300px" }}>
                    <Line data={lineData} options={chartOptions} />
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-4 mb-4">
              <div className="card chart-card border-0">
                <div className="card-header bg-transparent border-0 pb-0">
                  <h5 className="card-title mb-0">🥧 Phân Loại Hàng Hóa</h5>
                </div>
                <div className="card-body">
                  <div style={{ height: "300px" }}>
                    <Pie data={pieData} options={pieOptions} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="animated-footer text-center">
            <div className="text-white">
              <span className="rainbow-icon">🔄</span>
              Dữ liệu cập nhật tự động mỗi 10 giây | Làm mới {refreshCount} lần
              <span className="rainbow-icon ms-2">✨</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
