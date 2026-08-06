defmodule DistributedClusterCommunication.Validator do
  def validate_node_name(node_name) when is_atom(node_name), do: :ok
  def validate_node_name(_node_name), do: {:error, :invalid_node_name}

  def validate_topic(topic) when is_binary(topic) do
    if String.trim(topic) == "" do
      {:error, :invalid_topic}
    else
      :ok
    end
  end

  def validate_topic(_topic), do: {:error, :invalid_topic}

  def validate_payload(payload) when is_map(payload), do: :ok
  def validate_payload(_payload), do: {:error, :invalid_payload}
end
