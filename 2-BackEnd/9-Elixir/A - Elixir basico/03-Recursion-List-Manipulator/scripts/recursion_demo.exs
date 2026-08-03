base = Path.expand("../lib/recursion_list_manipulator", __DIR__)

Code.require_file(Path.join(base, "list_job.ex"))
Code.require_file(Path.join(base, "list_result.ex"))
Code.require_file(Path.join(base, "recursive_ops.ex"))

alias RecursionListManipulator.ListJob
alias RecursionListManipulator.RecursiveOps

operation =
  case System.argv() do
    [value] -> String.to_atom(value)
    _ -> :sum
  end

job = %ListJob{
  operation: operation,
  items: [3, 8, 13, 21, 34]
}

result = RecursiveOps.execute(job)

IO.inspect(result, label: "recursive_result")
