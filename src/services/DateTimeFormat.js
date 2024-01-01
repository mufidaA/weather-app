export const getCurrentDateTimeString = () => {
    const currDate = new Date();
    
    const [month, day, year] = currDate.toLocaleDateString().split('/');
    const formattedDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;

    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const todayOptions = { weekday: 'short', month: 'short', day: 'numeric' };

    const displayDate = currDate.toLocaleDateString('en-US', options);
    const today = currDate.toLocaleDateString('en-US', todayOptions);

    const currTime = new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit' });
    const [hours, minutes] = currTime.split(":").map(Number);
    let roundedHour = (hours + (minutes >= 30 ? 1 : -1) + 24) % 24;
    const roundedTime = `${roundedHour.toString().padStart(2, '0')}:00`;
 
    return {
      formattedDate: `${formattedDate}T${roundedTime}`,
      displayDate,
      today
    };
};