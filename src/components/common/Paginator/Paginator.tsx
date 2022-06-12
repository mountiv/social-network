import s from "./Paginator.module.css";
import React from "react";
import cn from "classnames";


type PaginatorPropsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (page: number) => void
}

export const Paginator = ({currentPage, pageSize, onPageChanged, totalUsersCount}: PaginatorPropsType) => {

    let pagesCount = Math.ceil(totalUsersCount / pageSize)
    const leftBorderPortionNumber = Math.min(currentPage - 2, pagesCount - 4)
    const rightBorderPortionNumber = Math.max(currentPage + 2, 5)

    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }
    return <div className={s.pagination}>
        <button
            disabled={currentPage <= 1}
            className={cn(s.buttonElement, s.arrow, s.prevArrow)}
            onClick={() => onPageChanged(currentPage - 1)}/>
        {pages
            .filter(p => p >= leftBorderPortionNumber && p <= rightBorderPortionNumber)
            .map(p =>
                <button
                    key={p}
                    onClick={() => onPageChanged(p)}
                    className={s.buttonElement + ' ' + (currentPage === p ? s.selected : '')}>{p}</button>
            )}
        <button disabled={pagesCount <= currentPage}
                className={cn(s.buttonElement, s.arrow, s.nextArrow)}
                onClick={() => onPageChanged(currentPage + 1)}/>
        <span className={s.spanElement}>{`${currentPage} of ${pagesCount}`}</span>
    </div>
}