import { useState } from 'react'
import { startOfWeek, startOfMonth, addDays } from 'date-fns'

export function useDateSelection() {
  const [startDate, setStartDate] = useState<Date>()
  const [endDate, setEndDate] = useState<Date>()
  const [selectedButton, setSelectedButton] = useState<string | null>(null)

  // 날짜 범위 유효성 검사
  const validateDateRange = () => {
    const yesterday = addDays(new Date(), -1)

    if (!startDate) {
      return { valid: false, message: '시작 날짜를 선택해주세요.' }
    }
    if (!endDate) {
      return { valid: false, message: '종료 날짜를 선택해주세요.' }
    }
    if (endDate < startDate) {
      return {
        valid: false,
        message: '종료 날짜는 시작 날짜보다 빠를 수 없습니다.',
      }
    }
    if (endDate > yesterday) {
      return {
        valid: false,
        message: '오늘 날짜 기준 하루 전까지 검색 가능합니다.',
      }
    }

    return { valid: true, message: '' }
  }

  // 기간별 날짜 선택 (일간, 주간, 월간)
  const setDatesByPeriod = (period: 'daily' | 'weekly' | 'monthly') => {
    const today = new Date()
    const yesterday = addDays(today, -1)
    let newStartDate: Date

    switch (period) {
      case 'daily':
        newStartDate = addDays(today, -1)
        break
      case 'weekly':
        newStartDate = startOfWeek(yesterday)
        break
      case 'monthly':
        newStartDate = startOfMonth(yesterday)
        break
    }

    setStartDate(newStartDate)
    setEndDate(yesterday)
    setSelectedButton(period)

    return { startDate: newStartDate, endDate: yesterday }
  }

  // 분기별 날짜 선택
  const setDatesByQuarter = (quarter: number) => {
    const year = new Date().getFullYear()
    let start: Date, end: Date

    switch (quarter) {
      case 1:
        start = new Date(year, 0, 1) // January 1st
        end = new Date(year, 2, 31) // March 31st
        break
      case 2:
        start = new Date(year, 3, 1) // April 1st
        end = new Date(year, 5, 30) // June 30th
        break
      case 3:
        start = new Date(year, 6, 1) // July 1st
        end = new Date(year, 8, 30) // September 30th
        break
      case 4:
        start = new Date(year, 9, 1) // October 1st
        end = new Date(year, 11, 31) // December 31st
        break
      default:
        start = new Date()
        end = new Date()
    }

    setStartDate(start)
    setEndDate(end)
    setSelectedButton(quarter.toString())

    return { startDate: start, endDate: end }
  }

  return {
    startDate,
    endDate,
    setStartDate,
    setEndDate,
    selectedButton,
    setSelectedButton,
    setDatesByPeriod,
    setDatesByQuarter,
    validateDateRange,
  }
}
