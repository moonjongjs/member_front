import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.scss";

export default function UserTable() {
  const [users, setUsers] = useState([]);

  useEffect(() => {   
    const API_BASE = process.env.REACT_APP_API_URL; // 자동으로 환경에 맞게 설정됨

    axios.get(`${API_BASE}api/user`)
    // axios.get('http://member-front.s3-website.eu-north-1.amazonaws.com')
      .then(res => setUsers(res.data) )
      .catch(err => console.error("API 오류:", err));
  }, []);

  return (
    <section className="user-table-section">
      <h1>React ↔ Spring Boot JSON 통신</h1>
      <p className="desc">MySQL → Spring Boot → React 실시간 연동 데이터</p>

      <div className="table-box">
        <table className="user-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>이름</th>
              <th>직업</th>
              <th>메시지</th>
            </tr>
          </thead>
          <tbody>

            {users.length === 0 ? (
              <tr>
                <td colSpan={4} className="empty">데이터를 불러오는 중...</td>
              </tr>
            ) : (
              users.map(item => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.role}</td>
                  <td>{item.message}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
