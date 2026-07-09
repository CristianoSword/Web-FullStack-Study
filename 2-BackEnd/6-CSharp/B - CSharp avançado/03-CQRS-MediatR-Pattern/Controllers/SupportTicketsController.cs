using MediatR;
using Microsoft.AspNetCore.Mvc;
using Study.CSharp.CqrsMediatRPattern.Features.Tickets.Commands.CreateTicket;
using Study.CSharp.CqrsMediatRPattern.Features.Tickets.Commands.UpdateTicketStatus;
using Study.CSharp.CqrsMediatRPattern.Features.Tickets.Queries.GetTicketById;
using Study.CSharp.CqrsMediatRPattern.Features.Tickets.Queries.ListTickets;
using Study.CSharp.CqrsMediatRPattern.Models;

namespace Study.CSharp.CqrsMediatRPattern.Controllers;

[ApiController]
[Route("api/support-tickets")]
public sealed class SupportTicketsController : ControllerBase
{
    private readonly ISender _sender;

    public SupportTicketsController(ISender sender)
    {
        _sender = sender;
    }

    [HttpGet]
    public async Task<ActionResult<IReadOnlyCollection<TicketResponse>>> List(CancellationToken cancellationToken)
    {
        var response = await _sender.Send(new ListTicketsQuery(), cancellationToken);
        return Ok(response);
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<TicketResponse>> GetById(Guid id, CancellationToken cancellationToken)
    {
        var response = await _sender.Send(new GetTicketByIdQuery(id), cancellationToken);
        return response is null ? NotFound() : Ok(response);
    }

    [HttpPost]
    public async Task<ActionResult<TicketResponse>> Create(
        [FromBody] CreateTicketRequest request,
        CancellationToken cancellationToken)
    {
        var response = await _sender.Send(
            new CreateTicketCommand(request.Title, request.Description, request.CustomerEmail, request.Assignee, request.Priority),
            cancellationToken);

        return CreatedAtAction(nameof(GetById), new { id = response.Id }, response);
    }

    [HttpPatch("{id:guid}/status")]
    public async Task<ActionResult<TicketResponse>> UpdateStatus(
        Guid id,
        [FromBody] UpdateTicketStatusRequest request,
        CancellationToken cancellationToken)
    {
        var response = await _sender.Send(new UpdateTicketStatusCommand(id, request.Status, request.Assignee), cancellationToken);
        return response is null ? NotFound() : Ok(response);
    }
}
