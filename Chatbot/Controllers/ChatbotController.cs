using Chatbot.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Chatbot.Models;
using Microsoft.EntityFrameworkCore;

namespace Chatbot.Controllers
{
    
        [Route("api/[controller]")]
        [ApiController]
        public class ChatbotController : ControllerBase
        {
            private readonly ApplicationDbContext _context;
            public ChatbotController(ApplicationDbContext context)
            {
                _context = context;
            }

            // GET: api/Departments
            [HttpGet]
            public async Task<ActionResult<IEnumerable<ChatbotModel>>> GetChatbot()
            {
                return await _context.Chatbot.ToListAsync();
            }

            [HttpGet("{id}")]
            public async Task<ActionResult<ChatbotModel>> GetChatbot(int id)
            {
                var chatbot = await _context.Chatbot.FindAsync(id);

                if (chatbot == null)
                {
                    return NotFound();
                }

                return chatbot;
            }

            [HttpPut("{id}")]
            public async Task<IActionResult> PutChatbot(int id, ChatbotModel chatbot)
            {
                if (id != chatbot.Id)
                {
                    return BadRequest();
                }

                _context.Entry(chatbot).State = EntityState.Modified;

                try
                {
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!ChatbotExists(id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }

                return NoContent();
            }

            // POST: api/Departments
            // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
            [HttpPost]
            public async Task<ActionResult<ChatbotModel>> PostChatbot(ChatbotModel chatbot)
            {
                _context.Chatbot.Add(chatbot);
                await _context.SaveChangesAsync();

                return CreatedAtAction("GetChatbot", new { id = chatbot.Id }, chatbot);
            }

            // DELETE: api/Departments/5
            [HttpDelete("{id}")]
            public async Task<IActionResult> DeleteChatbot(int id)
            {
                var chatbot = await _context.Chatbot.FindAsync(id);
                if (chatbot == null)
                {
                    return NotFound();
                }

                _context.Chatbot.Remove(chatbot);
                await _context.SaveChangesAsync();

                return NoContent();
            }

            private bool ChatbotExists(int id)
            {
                return _context.Chatbot.Any(e => e.Id == id);
            }


        }
    }
