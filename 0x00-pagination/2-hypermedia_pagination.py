#!/usr/bin/env python3
"""Simple pagination"""
import csv
import math
from typing import Any, Dict, List, Tuple


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


class Server:
    """Server class to paginate a database of popular baby names.
    """
    DATA_FILE = "Popular_Baby_Names.csv"

    def __init__(self):
        self.__dataset = None

    def dataset(self) -> List[List]:
        """Cached dataset
        """
        if self.__dataset is None:
            with open(self.DATA_FILE) as f:
                reader = csv.reader(f)
                dataset = [row for row in reader]
            self.__dataset = dataset[1:]

        return self.__dataset

    def get_page(self, page: int = 1, page_size: int = 10) -> List[List]:
        """performs simple pagination"""
        assert isinstance(page, int) and isinstance(page_size, int)
        assert page > 0 and page_size > 0
        indexes = index_range(page, page_size)
        aList = []
        dataset = self.dataset()
        aList.extend(dataset[indexes[0]: indexes[1]])
        return aList

    def get_hyper(self, page: int = 1, page_size: int = 10) -> Dict:
        """Hypermedia pagination"""
        aDict = {}
        total_pages = len(self.dataset()) // page_size + 1
        aDict['page_size'] = page_size
        aDict['page'] = page
        aDict['data'] = self.get_page(page, page_size)
        aDict['next_page'] = page + 1 if page + 1 <= total_pages else None
        aDict['prev_page'] = page - 1 if page > 1 else None
        aDict['total_pages'] = total_pages
        return aDict
