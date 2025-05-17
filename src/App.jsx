import { useState } from 'react'
import { students as studentData } from './dataStudents'
import './App.css'

const getAverage = (s) => ((s.math + s.literature + s.english) / 3).toFixed(2);
const getRating = (avg) => {
  if (avg >= 8) return "Giỏi";
  if (avg >= 6.5) return "Khá";
  if (avg >= 5) return "Trung bình";
  return "Yếu";
};

function App() {
  const [search, setSearch] = useState("");
  const [avgFilter, setAvgFilter] = useState("all");
  const [ratingFilter, setRatingFilter] = useState("all");

  const filteredStudents = studentData.filter((s) => {
    const avg = parseFloat(getAverage(s));
    const rating = getRating(avg);

    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase());
    const matchAvg =
      avgFilter === "all" ||
      (avgFilter === ">=8" && avg >= 8) ||
      (avgFilter === "6.5-8" && avg >= 6.5 && avg < 8) ||
      (avgFilter === "<6.5" && avg < 6.5);
    const matchRating = ratingFilter === "all" || rating === ratingFilter;

    return matchSearch && matchAvg && matchRating;
  });


  return (
    <>
        <div style={{ padding: 20 }}>
      <h1>Quản lý sinh viên</h1>

      <div style={{ marginBottom: 16 }}>
        <input
          type="text"
          placeholder="Tìm theo tên..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ marginRight: 8 }}
        />

        <select value={avgFilter} onChange={(e) => setAvgFilter(e.target.value)}>
          <option value="all">Tất cả điểm TB</option>
          <option value=">=8"> 8</option>
          <option value="6.5-8">6.5 - 8</option>
          <option value="<6.5"> 6.5</option>
        </select>

        <select
          style={{ marginLeft: 8 }}
          value={ratingFilter}
          onChange={(e) => setRatingFilter(e.target.value)}
        >
          <option value="all">Tất cả học lực</option>
          <option value="Giỏi">Giỏi</option>
          <option value="Khá">Khá</option>
          <option value="Trung bình">Trung bình</option>
          <option value="Yếu">Yếu</option>
        </select>
      </div>

      <table border="1" cellPadding="8" style={{ borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Họ tên</th>
            <th>Toán</th>
            <th>Văn</th>
            <th>Anh</th>
            <th>Điểm TB</th>
            <th>Học lực</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.map((s) => {
            const avg = parseFloat(getAverage(s));
            const rating = getRating(avg);
            return (
              <tr key={s.id}>
                <td>{s.id}</td>
                <td>{s.name}</td>
                <td>{s.math}</td>
                <td>{s.literature}</td>
                <td>{s.english}</td>
                <td>{avg}</td>
                <td>{rating}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
    </>
  )
}

export default App
