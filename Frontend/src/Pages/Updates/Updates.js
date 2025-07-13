import React, { useState } from 'react';
import { useGlobalData } from '../../GlobalDataContext';
import './updates.css';

const Updates = () => {
  const { updates, loading } = useGlobalData();
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const getDatesWithUpdates = () => {
    const dates = new Set();
    updates.forEach(update => {
      const date = new Date(update.createdAt).toISOString().split('T')[0];
      dates.add(date);
    });
    return Array.from(dates);
  };

  const filteredUpdates = selectedDate
    ? updates.filter(update => {
        const updateDate = new Date(update.createdAt).toISOString().split('T')[0];
        return updateDate === selectedDate;
      })
    : [];

  const renderCalendar = () => {
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    const datesWithUpdates = getDatesWithUpdates();

    const days = [];
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }

    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const hasUpdates = datesWithUpdates.includes(dateStr);
      const isSelected = selectedDate === dateStr;
      const isToday = new Date().toISOString().split('T')[0] === dateStr;

      days.push(
        <div
          key={`day-${day}`}
          className={`calendar-day 
            ${hasUpdates ? 'has-updates' : ''} 
            ${isSelected ? 'selected' : ''}
            ${isToday ? 'today' : ''}`}
          onClick={() => setSelectedDate(hasUpdates ? dateStr : null)}
        >
          {day}
          {hasUpdates && !isSelected && <div className="update-indicator"></div>}
        </div>
      );
    }

    return days;
  };

  const changeMonth = (increment) => {
    let newMonth = currentMonth + increment;
    let newYear = currentYear;
    
    if (newMonth < 0) {
      newMonth = 11;
      newYear--;
    } else if (newMonth > 11) {
      newMonth = 0;
      newYear++;
    }
    
    setCurrentMonth(newMonth);
    setCurrentYear(newYear);
    setSelectedDate(null);
  };

  const monthNames = ["January", "February", "March", "April", "May", "June", 
                     "July", "August", "September", "October", "November", "December"];

  return (
    <div id="updates-section" className='page-section'>
      <h2 className="global-heading">Daily Updates</h2>
      <div className="updates-content">
        <div className="updates-list-section">
          <h2 className="section-title">
            {selectedDate 
              ? `Updates for ${new Date(selectedDate).toLocaleDateString('en-US', { 
                  month: 'long', 
                  day: 'numeric', 
                  year: 'numeric' 
                })}`
              : 'Select a date to view updates'}
          </h2>
          
          {loading && <div className="loading-spinner"></div>}
          
          <div className="updates-list">
            {filteredUpdates.length > 0 ? (
              filteredUpdates.map(update => (
                <div key={update._id} className="updates-card">
                  <div className="update-time">
                    {new Date(update.createdAt).toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </div>
                  <pre className="updates-message">{update.message}</pre>
                </div>
              ))
            ) : (
              <div className="no-updates">
                {selectedDate 
                  ? "No updates available for this date" 
                  : <div className="select-date-prompt">
                      <div className="calendar-icon">📅</div>
                      <p>Select a date from the calendar to view updates</p>
                    </div>}
              </div>
            )}
          </div>
        </div>

        <div className="calendar-section">
          <div className="calendar-header">
            <button className="month-nav" onClick={() => changeMonth(-1)}>&lt;</button>
            <h3>{monthNames[currentMonth]} {currentYear}</h3>
            <button className="month-nav" onClick={() => changeMonth(1)}>&gt;</button>
          </div>
          <div className="calendar-grid">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="calendar-weekday">{day}</div>
            ))}
            {renderCalendar()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Updates;