defmodule RecursionListManipulator.RecursiveOps do
  alias RecursionListManipulator.ListJob
  alias RecursionListManipulator.ListResult

  def execute(%ListJob{operation: :sum, items: items}) do
    total = sum(items)
    %ListResult{operation: :sum, result: total, summary: "Recursive sum = #{total}"}
  end

  def execute(%ListJob{operation: :count, items: items}) do
    total = count(items)
    %ListResult{operation: :count, result: total, summary: "Recursive count = #{total}"}
  end

  def execute(%ListJob{operation: :reverse, items: items}) do
    reversed = reverse(items)
    %ListResult{operation: :reverse, result: reversed, summary: "Recursive reverse completed"}
  end

  def execute(%ListJob{operation: :double, items: items}) do
    doubled = map_double(items)
    %ListResult{operation: :double, result: doubled, summary: "Recursive doubling completed"}
  end

  def execute(%ListJob{operation: :evens, items: items}) do
    evens = filter_evens(items)
    %ListResult{operation: :evens, result: evens, summary: "Recursive even filtering completed"}
  end

  def sum([]), do: 0
  def sum([head | tail]), do: head + sum(tail)

  def count([]), do: 0
  def count([_head | tail]), do: 1 + count(tail)

  def reverse(items), do: reverse(items, [])
  defp reverse([], acc), do: acc
  defp reverse([head | tail], acc), do: reverse(tail, [head | acc])

  def map_double([]), do: []
  def map_double([head | tail]), do: [head * 2 | map_double(tail)]

  def filter_evens([]), do: []

  def filter_evens([head | tail]) when rem(head, 2) == 0 do
    [head | filter_evens(tail)]
  end

  def filter_evens([_head | tail]), do: filter_evens(tail)
end
