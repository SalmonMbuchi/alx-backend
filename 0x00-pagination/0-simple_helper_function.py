#!/usr/bin/env python3
"""Simple helper function"""
from typing import Tuple


def index_range(page: int, page_size: int) -> Tuple[int, int]:
    """Return a tuple containing start and end index corresponding
    to the range of indexes to return in a list for the pagination
    parameters"""
    startIndex = 0
    endIndex = 0
    pageIndex = 1
    aTuple: Tuple[int, int]
    if page == 1:
        aTuple = (startIndex, startIndex + page_size)
        return aTuple
    for pageIndex in range(page):
        if pageIndex == 1:
            endIndex = startIndex + page_size
        startIndex = endIndex
        endIndex += page_size
    aTuple = (startIndex, endIndex)
    return aTuple
