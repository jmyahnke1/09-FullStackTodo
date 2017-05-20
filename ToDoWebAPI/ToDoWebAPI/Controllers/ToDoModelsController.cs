using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using ToDoWebAPI.Models;

namespace ToDoWebAPI.Controllers
{
    public class ToDoModelsController : ApiController
    {
        private ToDoDBContext db = new ToDoDBContext();

        // GET: api/ToDoModels
        public IQueryable<ToDoModel> GetToDoModels()
        {
            return db.ToDoModels;
        }

        // GET: api/ToDoModels/5
        [ResponseType(typeof(ToDoModel))]
        public IHttpActionResult GetToDoModel(int id)
        {
            ToDoModel toDoModel = db.ToDoModels.Find(id);
            if (toDoModel == null)
            {
                return NotFound();
            }

            return Ok(toDoModel);
        }

        // PUT: api/ToDoModels/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutToDoModel(int id, ToDoModel toDoModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != toDoModel.KeyId)
            {
                return BadRequest();
            }

            db.Entry(toDoModel).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ToDoModelExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/ToDoModels
        [ResponseType(typeof(ToDoModel))]
        public IHttpActionResult PostToDoModel(ToDoModel toDoModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.ToDoModels.Add(toDoModel);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = toDoModel.KeyId }, toDoModel);
        }

        // DELETE: api/ToDoModels/5
        [ResponseType(typeof(ToDoModel))]
        public IHttpActionResult DeleteToDoModel(int id)
        {
            ToDoModel toDoModel = db.ToDoModels.Find(id);
            if (toDoModel == null)
            {
                return NotFound();
            }

            db.ToDoModels.Remove(toDoModel);
            db.SaveChanges();

            return Ok(toDoModel);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ToDoModelExists(int id)
        {
            return db.ToDoModels.Count(e => e.KeyId == id) > 0;
        }
    }
}