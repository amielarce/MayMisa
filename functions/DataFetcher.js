import Data from '../data/Data.json';

const DataFetcher = {
  getNextSchedule: function (id, currentDate) {
    const dayOfWeek = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];

    // Obtain necessary data from the current date
    const currentDay = currentDate.getDay();
    const currentHour = currentDate.getHours();
    const currentMinute = currentDate.getMinutes();

    // Obtain schedule from where to find next schedule
    const daySchedule = Data.find((item) => item.id === id).schedule.filter(
      (item) => {
        return item.day === dayOfWeek[currentDay];
      },
    );

    var retVal = ['No more masses for today.', ''];
    daySchedule.forEach((item) => {
      // Get hour and minute from
      const splitTime = item.time.split(':');
      
      if (
        parseInt(splitTime[0]) > currentHour ||
        (parseInt(splitTime[0]) === currentHour &&
          parseInt(splitTime[1]) > currentMinute)
      ) {
        retVal = [item.time, item.language];
      }
    });
    return retVal; // If no schedule is found
  },
  /***  Obtain the data needed for the display of markers
   ***  for the whole map */
  getAllMarkerData: function (currentDate) {
    var markerDataArray = [];

    Data.forEach((item) => {
      const [time, language] = this.getNextSchedule(item.id, currentDate);
      var markerData = {
        id: item.id,
        coordinates: item.coordinates,
        name: item.name,
        image: item.image,
        nextSchedule: time,
        language: language
      };

      markerDataArray.push(markerData);
    });
    return markerDataArray;
  },
  getNearbyMarkerData: function (region, currentDate) {
    var markerDataArray = [];

    // Compute min/max values for latitude and longitude
    const latMin = region.latitude - region.latitudeDelta/2;
    const latMax = latMin + region.latitudeDelta;
    const longMin = region.longitude - region.longitudeDelta/2;
    const longMax = longMin + region.longitudeDelta;

    Data.filter((item) => {
      return (
        item.coordinates.latitude >= latMin &&
        item.coordinates.latitude <= latMax &&
        item.coordinates.longitude >= longMin &&
        item.coordinates.longitude <= longMax
      );
    }).forEach((item) => {      
      const [time, language] = this.getNextSchedule(item.id, currentDate);
      var markerData = {
        id: item.id,
        coordinates: item.coordinates,
        name: item.name,
        image: item.image,
        nextSchedule: time,
        language: language
      };

      markerDataArray.push(markerData);
    });
    return markerDataArray;
  },
  /*** Get the schedule for the selected church */
  getScheduleDetails: function (id) {
    const itemIndex = Data.findIndex((item) => item.id == id);

    if (itemIndex < 0) {
      return {isFound: false};
    }

    return {
      name: Data[itemIndex].name,
      address: Data[itemIndex].address,
      image: Data[itemIndex].image,
      website: Data[itemIndex].website,
      schedule: Data[itemIndex].schedule,
      isFound: true,
    };
  },
};

export default DataFetcher;
