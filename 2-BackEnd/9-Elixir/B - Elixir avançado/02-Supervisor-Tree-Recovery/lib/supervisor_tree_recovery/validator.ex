defmodule SupervisorTreeRecovery.Validator do
  alias SupervisorTreeRecovery.Job

  def validate_worker_name(worker_name) when is_binary(worker_name) do
    if String.trim(worker_name) == "" do
      {:error, :invalid_worker_name}
    else
      :ok
    end
  end

  def validate_worker_name(_worker_name), do: {:error, :invalid_worker_name}

  def validate_job(%Job{id: id, type: type, payload: payload}) do
    cond do
      not is_binary(id) or String.trim(id) == "" -> {:error, :invalid_job_id}
      not is_atom(type) -> {:error, :invalid_job_type}
      not is_map(payload) -> {:error, :invalid_job_payload}
      true -> :ok
    end
  end

  def validate_job(_job), do: {:error, :invalid_job}
end
