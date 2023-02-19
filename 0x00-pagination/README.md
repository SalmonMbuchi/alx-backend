# 0x00-pagination

In this project, I learnt about **Pagination** as part of *uniform interface* in REST API design. I learnt how to:

1. Paginate a dataset with simple page and page_size parameters
2. Paginate a dataset with hypermedia metadata
3. Paginate in a deletion-resilient manner

## Tasks

### 0. Simple helper function

Write a function named `index_range` that takes two integer arguments `page` and `page_size`.

The function should return a tuple of size two containing a start index and an end index corresponding to the range of indexes to return in a list for those particular pagination parameters.

**File**: [0-simple_helper_function.py](./0-simple_helper_function.py)

### 1. Simple pagination

Copy `index_range` from the previous task. Implement a method named `get_page` that takes two integer arguments `page` with default value 1 and `page_size` with default value 10.

  - You have to use this CSV file (same as the one presented at the top of the project)
  - Use `assert` to verify that both arguments are integers greater than 0.
  - Use `index_range` to find the correct indexes to paginate the dataset correctly and return the appropriate page of the dataset (i.e. the correct list of rows).
  - If the input arguments are out of range for the dataset, an empty list should be returned.

**File**: [1-simple_pagination.py](./1-simple_pagination.py)

### 2. Hypermedia pagination

Replicate code from the previous task.

Implement a `get_hyper` method that takes the same arguments (and defaults) as `get_page` and returns a dictionary containing the following key-value pairs:

    - `page_size`: the length of the returned dataset page
    - `page`: the current page number
    - `data`: the dataset page (equivalent to return from previous task)
    - `next_page`: number of the next page, None if no next page
    - `prev_page`: number of the previous page, None if no previous page
    - `total_pages`: the total number of pages in the dataset as an integer

Make sure to reuse `get_page` in your implementation. You can use the math module if necessary.

**File**: [2-hypermedia_pagination.py](./2-hypermedia_pagination.py)

### 3. Deletion-resilient hypermedia_pagination

The goal here is that if between two queries, certain rows are removed from the dataset, the user does not miss items from dataset when changing page.

Implement a `get_hyper_index` method with two integer arguments: `index` with a `None` default value and `page_size` with default value of 10.

  1. The method should return a dictionary with the following key-value pairs:
    - `index`: the current start index of the return page. That is the index of the first item in the current page. For example if requesting page 3 with `page_size` 20, and no data was removed from the dataset, the current index should be 60.
    - `next_index`: the next index to query with. That should be the index of the first item after the last item on the current page.
    - `page_size`: the current page size
    - `data`: the actual page of the dataset

Requirements/Behavior:

    1. Use assert to verify that index is in a valid range.
    2. If the user queries index 0, page_size 10, they will get rows indexed 0 to 9 included.
    3. If they request the next index (10) with page_size 10, but rows 3, 6 and 7 were deleted, the user should still receive rows indexed 10 to 19 included.

**File**: [3-hypermedia_del_pagination.py](./3-hypermedia_del_pagination.py)

