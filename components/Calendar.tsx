import { useCallback, useEffect, useState } from 'react';
import { Btn, Row, Text } from 'styles/styled';
import styled from 'styled-components';
import { useQuery } from 'react-query';
import { getSales } from 'utill/api';
import { IGetSalesData } from 'types/api';
import DailyModal from './DailyModal';

const Container = styled.div`
  width: 100%;
  height: 100%;
`;
const CalendarRow = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;
const MonthlySales = styled.div`
  margin-left: 60px;
  font-size: 1.7em;
  color: ${(props) => props.theme.textColor};
`;
const DayBox = styled.div<{ check?: number; data?: boolean }>`
  background-color: ${(props) => props.theme.containerColor};
  width: calc(100% / 7);
  height: 90px;
  padding: 3px;
  border: 1px solid ${(props) => props.theme.borderLine};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: ${(props) =>
    props.check === 0
      ? 'red'
      : props.check === 6
      ? 'blue'
      : props.theme.textColor};

  transition: border-color 0.2s ease-in-out;
  cursor: ${(props) => (props.data ? 'pointer' : 'default')};
  &:hover {
    border-color: ${(props) => (props.data ? 'green' : 'none')};
  }
`;

const WeekBox = styled(DayBox)`
  height: 50px;
  justify-content: center;
  align-items: center;
`;

const SalesBox = styled.div`
  color: inherit;
  margin: 0 0 0 auto;
  font-weight: 500;
  font-size: 1.5em;
`;
export default function Calendar() {
  const today = {
    year: new Date().getFullYear(), //오늘 연도
    month: new Date().getMonth() + 1, //오늘 월
    date: new Date().getDate(), //오늘 날짜
    day: new Date().getDay(), //오늘 요일
  };
  const week = ['일', '월', '화', '수', '목', '금', '토']; //일주일
  const [selectedYear, setSelectedYear] = useState<number>(today.year); //현재 선택된 연도
  const [selectedMonth, setSelectedMonth] = useState<number>(today.month); //현재 선택된 달
  const [array, setArray] = useState([]);
  const [selectedDay, setSelectedDay] = useState<number | null>();
  const { data, isLoading } = useQuery<IGetSalesData>(
    ['sales', selectedYear + '_' + selectedMonth],
    () => getSales(selectedYear, selectedMonth)
  );
  const dateTotalCount = new Date(selectedYear, selectedMonth, 0).getDate(); //선택된 연도, 달의 마지막 날짜
  const yearArr = Array.from({ length: 4 }, (v, i) => today.year - 3 + i); //현재년도부터 3년전까지만 (나중에 가입날 기준으로 잡아도)
  const monthArr = Array.from({ length: 12 }, (v, i) => i + 1);
  const prevMonth = useCallback(() => {
    //이전 달 보기 보튼
    if (selectedMonth === 1) {
      if (selectedYear === yearArr[0]) {
        return;
      } else {
        setSelectedMonth(12);
        setSelectedYear(selectedYear - 1);
      }
    } else {
      setSelectedMonth(selectedMonth - 1);
    }
  }, [selectedMonth]);

  const nextMonth = useCallback(() => {
    //다음 달 보기 버튼
    if (selectedMonth === 12) {
      if (selectedYear === today.year) {
        return;
      } else {
        setSelectedMonth(1);
        setSelectedYear(selectedYear + 1);
      }
    } else {
      setSelectedMonth(selectedMonth + 1);
    }
  }, [selectedMonth]);

  const changeSelectMonth = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMonth(Number(e.target.value));
  };
  const changeSelectYear = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(Number(e.target.value));
  };

  useEffect(() => {
    //선택된 달의 날짜들 반환 함수
    let dayArr = [];
    const day = new Date(selectedYear, selectedMonth - 1, 1).getDay();
    week.map((nowDay, index) => {
      if (week[day] === nowDay) {
        for (let i = 0; i < dateTotalCount; i++) {
          const check = new Date(
            selectedYear,
            selectedMonth - 1,
            i + 1
          ).getDay();
          dayArr.push(
            <DayBox
              onClick={() => setSelectedDay(i + 1)}
              key={i + 1}
              check={check}
              data={'true'}
            >
              {i + 1}
              <SalesBox>
                {data?.dailySales.map((dayData) => {
                  return Number(dayData.day) === i + 1
                    ? dayData.salesAmount.toLocaleString('ko-KR')
                    : null;
                })}
              </SalesBox>
            </DayBox>
          );
        }
      } else if (index + 1 > day) {
        return;
      } else {
        dayArr.push(<DayBox key={nowDay}></DayBox>);
      }
    });

    setArray(dayArr);
  }, [data, selectedYear, selectedMonth, dateTotalCount]);

  return (
    <>
      <Row>
        <>
          <div>
            <select onChange={changeSelectYear} value={selectedYear}>
              {yearArr.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
            <Text>년</Text>
          </div>
          <div>
            <select onChange={changeSelectMonth} value={selectedMonth}>
              {monthArr.map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>
            <Text>월</Text>
          </div>
        </>
        <>
          <Btn onClick={prevMonth}>◀︎</Btn>
          <Btn onClick={nextMonth}>▶︎</Btn>
        </>
        <MonthlySales>
          월 매출액: {data ? data?.monthlySales.toLocaleString('ko-KR') : '0'}{' '}
          원
        </MonthlySales>
      </Row>
      <Container>
        <CalendarRow>
          {week.map((day) => {
            switch (day) {
              case '일':
                return (
                  <WeekBox key={day} check={0}>
                    {day}
                  </WeekBox>
                );
              case '토':
                return (
                  <WeekBox key={day} check={6}>
                    {day}
                  </WeekBox>
                );
              default:
                return <WeekBox key={day}>{day}</WeekBox>;
            }
          })}
        </CalendarRow>
        <CalendarRow>{array}</CalendarRow>
      </Container>
      {selectedDay && (
        <DailyModal
          year={selectedYear}
          month={selectedMonth}
          day={selectedDay}
          setDay={setSelectedDay}
        />
      )}
    </>
  );
}
