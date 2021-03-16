import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Button,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {Table, Rows, Row} from 'react-native-table-component';
import Utility from './../functions/Utility';

const weekdays = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

const Schedule = (props) => {
  const createScheduleData = (day, schedule) => {
    const dayOfWeek = weekdays[day];
    var currentSchedule = [];

    schedule
      .filter((entry) => {
        return entry.day === dayOfWeek;
      })
      .forEach((item) => {
        currentSchedule.push([
          Utility.formatToTwelveHourTime(item.time),
          item.language,
          item.info,
        ]);
      });

    return currentSchedule;
  };

  // Variables for day of week processes∏
  const date = new Date();
  const today = date.getDay();
  const [selectedDay, setSelectedDay] = useState(today);

  // Variables for mass schedule for the day
  const [scheduleData, setScheduleData] = useState(
    createScheduleData(selectedDay, props.data),
  );

  const onLeftSelectorPress = () => {
    var newDay = selectedDay - 1;
    if (newDay < 0) {
      newDay = weekdays.length - 1;
    }
    setSelectedDay(newDay);
    setScheduleData(createScheduleData(newDay, props.data));
  };
  const onRightSelectorPress = () => {
    var newDay = selectedDay + 1;
    if (newDay > weekdays.length - 1) {
      newDay = 0;
    }
    setSelectedDay(newDay);
    setScheduleData(createScheduleData(newDay, props.data));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Mass Schedule</Text>
      <View style={styles.daySelector}>
        <TouchableOpacity
          style={styles.selectorButton}
          onPress={onLeftSelectorPress}>
          <Text style={styles.selectorText}>&#8249;</Text>
        </TouchableOpacity>
        <Text style={styles.dayText}>{weekdays[selectedDay]}</Text>
        <TouchableOpacity
          style={styles.selectorButton}
          onPress={onRightSelectorPress}>
          <Text style={styles.selectorText}>&#8250;</Text>
        </TouchableOpacity>
      </View>
      <View>
        <Table>
          {scheduleData.map((rowData, index) => (
            <Row
              key={index}
              data={rowData}
              style={[styles.row, index % 2 && {backgroundColor: '#E0FFFF'}]}
              textStyle={styles.tableText}
            />
          ))}
        </Table>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    padding: 5,
    margin: 2
  },
  daySelector: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 20,
  },
  selectorButton: {
    flex: 1,
    width: 20,
    height: 40,
    alignItems: 'center',
    borderRadius: 40,
    backgroundColor: '#a9a9a9',
    justifyContent: 'center',
  },
  dayText: {
    fontSize: 20,
    flex: 5,
    alignSelf: 'center',
    textAlign: 'center',
  },
  selectorText: {
    fontSize: 25,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  tableText: {
    fontSize: 16,
    textAlign: 'left'
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  row: {
    backgroundColor: '#87CEFA',
    paddingLeft: 15,
    minHeight: 40
  },
});

export default Schedule;
