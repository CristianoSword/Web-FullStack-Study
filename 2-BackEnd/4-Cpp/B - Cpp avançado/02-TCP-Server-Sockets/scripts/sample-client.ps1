$ErrorActionPreference = "Stop"

param(
  [string]$HostName = "127.0.0.1",
  [int]$Port = 8080,
  [string[]]$Messages = @("/nick powershell", "hello from powershell", "/who", "/quit")
)

$client = [System.Net.Sockets.TcpClient]::new()
$client.Connect($HostName, $Port)

$stream = $client.GetStream()
$reader = [System.IO.StreamReader]::new($stream)
$writer = [System.IO.StreamWriter]::new($stream)
$writer.AutoFlush = $true

Start-Sleep -Milliseconds 200
while ($stream.DataAvailable) {
  $line = $reader.ReadLine()
  if ($null -ne $line) { Write-Host $line }
}

foreach ($message in $Messages) {
  $writer.WriteLine($message)
  Start-Sleep -Milliseconds 150
  while ($stream.DataAvailable) {
    $line = $reader.ReadLine()
    if ($null -ne $line) { Write-Host $line }
  }
}

$reader.Dispose()
$writer.Dispose()
$stream.Dispose()
$client.Dispose()
