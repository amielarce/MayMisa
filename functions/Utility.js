const Utility = {
  formatToTwelveHourTime: function (time) {
    var [hourString, minuteString] = time.split(':');

    // Format time
    var meridian = '';
    var hour = parseInt(hourString);
    if (hour < 12) {
      meridian = 'am';
    } else if (hour === 12) {
      if (parseInt(minuteString) === 0) {
        meridian = 'nn';
      } else {
        meridian = 'pm';
      }
    } else if (hour > 12) {
      if (hour < 24) {
        hour = hour % 12;
        meridian = 'pm';
      } else {
        hour = 12;
        meridian = 'mn';
      }
    }
    var formattedTime = hour.toString() + ':' + minuteString + ' ' + meridian;

    return formattedTime;
  },
};

export default Utility;
